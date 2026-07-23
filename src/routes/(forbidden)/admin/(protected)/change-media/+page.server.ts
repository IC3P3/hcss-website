import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { Event } from '$lib/server/models/Event';
import { Media } from '$lib/server/models/Media';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import { logger } from '$lib/server/utils/logger';
import { mediaUrl } from '$lib/server/utils/media';
import { fail, type Actions } from '@sveltejs/kit';
import { asc, desc, eq } from 'drizzle-orm';
import { unlink } from 'fs/promises';
import { join } from 'path';
import type { PageServerLoad } from './$types';

const UPLOAD_PATH = env.UPLOAD_PATH ?? 'upload';

export const load: PageServerLoad = async () => {
	const mediaRows = await db
		.select({
			id: Media.id,
			title: Media.title,
			description: Media.description,
			path: Media.path,
			eventId: Media.eventId
		})
		.from(Media)
		.orderBy(desc(Media.id));

	const media = mediaRows.map((m) => ({
		id: m.id,
		title: m.title,
		description: m.description,
		url: mediaUrl(m.path),
		eventId: m.eventId
	}));

	const events = await db
		.select({
			id: Event.id,
			title: Event.title,
			date: Event.time
		})
		.from(Event)
		.orderBy(asc(Event.time));

	return { media, events };
};

function parseId(value: FormDataEntryValue | null): number | null {
	const id = value ? parseInt(value.toString(), 10) : NaN;
	return Number.isNaN(id) ? null : id;
}

export const actions = {
	update: async ({ request }) => {
		const data = await request.formData();

		const id = parseId(data.get('id'));
		if (id === null) {
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Ungültiges Medium!' });
		}

		const title = data.get('title')?.toString().trim();
		if (!title) {
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Kein Titel angegeben!' });
		}

		const description = data.get('description')?.toString().trim() || null;

		const eventId = data.get('event')?.toString();
		let eventInt: number | null = null;
		if (eventId) {
			eventInt = parseInt(eventId, 10);
			if (Number.isNaN(eventInt)) {
				return fail(HTTP_STATUS_CODES.badRequest, {
					error: 'Veranstaltung konnte nicht erkannt werden!'
				});
			}
		}

		const result = await db
			.update(Media)
			.set({ title, description, eventId: eventInt })
			.where(eq(Media.id, id));

		if (result.changes === 0) {
			return fail(HTTP_STATUS_CODES.notFound, { error: 'Medium nicht gefunden!' });
		}

		logger.info('Media updated', { id, title, eventId: eventInt });
		return { success: 'Das Medium wurde gespeichert.' };
	},

	delete: async ({ request }) => {
		const data = await request.formData();

		const id = parseId(data.get('id'));
		if (id === null) {
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Ungültiges Medium!' });
		}

		const [media] = await db
			.select({ path: Media.path })
			.from(Media)
			.where(eq(Media.id, id))
			.limit(1);
		if (!media) {
			return fail(HTTP_STATUS_CODES.notFound, { error: 'Medium nicht gefunden!' });
		}

		await db.delete(Media).where(eq(Media.id, id));

		// DB row is the source of truth; a leftover file is harmless, so best effort.
		await unlink(join(process.cwd(), UPLOAD_PATH, media.path)).catch((err) =>
			logger.warn('Orphaned upload: file removal after delete failed', {
				id,
				path: media.path,
				error: String(err)
			})
		);

		logger.info('Media deleted', { id, path: media.path });
		return { success: 'Das Medium wurde gelöscht.' };
	}
} satisfies Actions;
