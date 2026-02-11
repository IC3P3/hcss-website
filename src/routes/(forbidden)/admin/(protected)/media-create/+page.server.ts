import { UPLOAD_PATH } from '$env/static/private';
import { db } from '$lib/server/db';
import { Media } from '$lib/server/models/Media';
import { HTTP_BAD_REQUEST, ONE_BYTE_IN_BIT } from '$lib/server/utils/constants';
import { fail, type Actions } from '@sveltejs/kit';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { SvelteDate } from 'svelte/reactivity';

export const actions = {
	default: async ({ request }: { request: Request }) => {
		const data = await request.formData();
		const title = data.get('title')?.toString();
		if (!title) {
			return fail(HTTP_BAD_REQUEST, { error: 'Kein Titel angegeben!' });
		}

		const description = data.get('description')?.toString();

		const slug = `${SvelteDate.now()}-${crypto.randomUUID().slice(0, ONE_BYTE_IN_BIT)}`;

		const file = data.get('media') as File;
		const filepath = await uploadFile(file);

		const eventId = data.get('event')?.toString();
		let eventInt: number | null = null;
		if (eventId) {
			eventInt = parseInt(eventId, 10);
			if (!eventInt) {
				return fail(HTTP_BAD_REQUEST, {
					error: 'Veranstaltung konnte nicht erkannt werden!'
				});
			}
		}

		db.insert(Media).values({
			title: title,
			description: description ?? null,
			slug: slug,
			path: filepath,
			eventId: eventInt
		});
	}
} satisfies Actions;

async function uploadFile(file: File): Promise<string> {
	const buffer = Buffer.from(await file.arrayBuffer());
	const filename = `${SvelteDate.now()}-${file.name}`;

	const uploadDir = join(process.cwd(), UPLOAD_PATH);
	await mkdir(uploadDir, { recursive: true });

	const filepath = join(uploadDir, filename);
	await writeFile(filepath, buffer);

	return filepath;
}
