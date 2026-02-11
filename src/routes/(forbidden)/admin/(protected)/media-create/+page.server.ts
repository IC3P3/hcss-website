import { UPLOAD_PATH } from '$env/static/private';
import { db } from '$lib/server/db';
import { Media } from '$lib/server/models/Media';
import { HTTP_BAD_REQUEST } from '$lib/server/utils/constants';
import { fail, type Actions } from '@sveltejs/kit';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { SvelteDate } from 'svelte/reactivity';

export const actions = {
	default: async ({ request }: { request: Request }) => {
		const dbEventUpdate: typeof Media.$inferInsert = {};

		const data = await request.formData();
		const file = data.get('media') as File;
		const filepath = await uploadFile(file);

		dbEventUpdate.path = filepath;

		const title = data.get('title')?.toString();
		if (!title) {
			return fail(HTTP_BAD_REQUEST, { error: 'Kein Titel angegeben!' });
		}
		dbEventUpdate.titel = title;

		const description = data.get('description')?.toString();
		if (description) {
			dbEventUpdate.description = description;
		}

		const eventId = data.get('event')?.toString();
		if (eventId) {
			const eventInt = parseInt(eventId, 10);
			if (!eventInt) {
				return fail(HTTP_BAD_REQUEST, {
					error: 'Veranstaltung konnte nicht erkannt werden!'
				});
			}
			dbEventUpdate.eventId = eventInt;
		}

		db.insert(Media).values(dbEventUpdate);
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
