import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { Media } from '$lib/server/models/Media';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import { logger } from '$lib/server/utils/logger';
import { fail, type Actions } from '@sveltejs/kit';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import type { PageServerLoad } from './$types';
import { Event } from '$lib/server/models/Event';
import sharp from 'sharp';

const UPLOAD_PATH = env.UPLOAD_PATH ?? 'upload';

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
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Kein Titel angegeben!' });
		}

		const description = data.get('description')?.toString() || null;

		const NUMBER_OF_UUID_CHARS = 8;
		const slug = `${Date.now()}-${crypto.randomUUID().slice(0, NUMBER_OF_UUID_CHARS)}`;

		const file = data.get('media');
		if (!(file instanceof File) || file.size === 0) {
			return fail(HTTP_STATUS_CODES.notFound, { error: 'Kein Medium gefunden!' });
		}
		const filepath = await uploadFile(file);
		if (!filepath) {
			return fail(HTTP_STATUS_CODES.unsupportedMediaType, {
				error: 'Das Bild hat den falschen Datentypen!'
			});
		}

		const eventId = data.get('event')?.toString();
		let eventInt: number | null = null;
		if (eventId) {
			eventInt = parseInt(eventId, 10);
			if (Number.isNaN(eventInt)) {
				return fail(HTTP_STATUS_CODES.notFound, {
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
			await unlink(join(process.cwd(), UPLOAD_PATH, filepath)).catch((err) =>
				logger.error('Orphaned upload: cleanup after failed insert did not delete file', {
					path: filepath,
					error: String(err)
				})
			);
			throw e;
		}

		logger.info('Media created', { title, path: filepath, eventId: eventInt });
		return { success: 'Das Medium wurde hochgeladen.' };
	}
} satisfies Actions;

async function uploadFile(file: File): Promise<string | null> {
	let buffer = Buffer.from(await file.arrayBuffer());

	buffer = await sharp(buffer)
		.webp({ quality: 82, effort: 6 })
		.resize({ width: 2160, withoutEnlargement: true })
		.toBuffer();

	const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}.webp`;

	const uploadDir = join(process.cwd(), UPLOAD_PATH);
	await mkdir(uploadDir, { recursive: true });

	const filepath = join(uploadDir, filename);
	await writeFile(filepath, buffer);

	return filename;
}
