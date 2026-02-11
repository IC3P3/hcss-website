import { UPLOAD_PATH } from '$env/static/private';
import { db } from '$lib/server/db';
import { Media } from '$lib/server/models/Media';
import { HTTP_BAD_REQUEST, HTTP_UNSUPPORTED_MEDIA_TYPE } from '$lib/server/utils/constants';
import { isWebP } from '$lib/server/utils/file-type_functions';
import { fail, type Actions } from '@sveltejs/kit';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import type { PageServerLoad } from './$types';
import { Event } from '$lib/server/models/Event';

export const load: PageServerLoad = async () => {
	const events = await db
		.select({
			id: Event.id,
			title: Event.title,
			date: Event.time
		})
		.from(Event);

	return { events };
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title')?.toString();
		if (!title) {
			return fail(HTTP_BAD_REQUEST, { error: 'Kein Titel angegeben!' });
		}

		const description = data.get('description')?.toString() || null;

		const NUMBER_OF_UUID_CHARS = 8;
		const slug = `${Date.now()}-${crypto.randomUUID().slice(0, NUMBER_OF_UUID_CHARS)}`;

		const file = data.get('media') as File;
		if (!file) {
			return fail(HTTP_BAD_REQUEST, { error: 'Kein Medium gefunden!' });
		}
		const filepath = await uploadFile(file);
		if (!filepath) {
			return fail(HTTP_UNSUPPORTED_MEDIA_TYPE, {
				error: 'Das Bild hat den falschen Datentypen!'
			});
		}

		const eventId = data.get('event')?.toString();
		let eventInt: number | null = null;
		if (eventId) {
			eventInt = parseInt(eventId, 10);
			if (Number.isNaN(eventInt)) {
				return fail(HTTP_BAD_REQUEST, {
					error: 'Veranstaltung konnte nicht erkannt werden!'
				});
			}
		}

		try {
			await db.insert(Media).values({
				title: title,
				description: description,
				slug: slug,
				path: filepath,
				eventId: eventInt
			});
		} catch (e) {
			await unlink(join(process.cwd(), filepath)).catch(() => {
				// TODO: Add logging
			});
			throw e;
		}

		return { success: 'Das Medium wurde hochgeladen.' };
	}
} satisfies Actions;

async function uploadFile(file: File): Promise<string | null> {
	const buffer = Buffer.from(await file.arrayBuffer());

	if (!isWebP(buffer)) {
		return null;
	}

	const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

	const uploadDir = join(process.cwd(), UPLOAD_PATH);
	await mkdir(uploadDir, { recursive: true });

	const filepath = join(uploadDir, filename);
	await writeFile(filepath, buffer);

	return join(UPLOAD_PATH, filename);
}
