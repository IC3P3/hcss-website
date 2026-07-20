import { db } from '$lib/server/db';
import { Event } from '$lib/server/models/Event';
import { Media } from '$lib/server/models/Media';
import { PageContent } from '$lib/server/models/PageContent';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import { logger } from '$lib/server/utils/logger';
import { mediaUrl } from '$lib/server/utils/media';
import { fail, type Actions } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

const SLOT_PREFIX = 'slot-';

export const load: PageServerLoad = async () => {
	const slots = await db
		.select({
			id: PageContent.id,
			tag: PageContent.tag,
			title: PageContent.title,
			mediaId: PageContent.mediaId
		})
		.from(PageContent)
		.orderBy(asc(PageContent.tag), asc(PageContent.id));

	const mediaRows = await db
		.select({
			id: Media.id,
			title: Media.title,
			path: Media.path,
			eventTitle: Event.title
		})
		.from(Media)
		.leftJoin(Event, eq(Event.id, Media.eventId))
		.orderBy(asc(Event.time), asc(Media.title));

	const media = mediaRows.map((m) => ({
		id: m.id,
		title: m.title,
		url: mediaUrl(m.path),
		eventTitle: m.eventTitle
	}));

	return { slots, media };
};

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user)
			return fail(HTTP_STATUS_CODES.unauthorized, { error: 'Kein angemeldeter Nutzer.' });

		const data = await request.formData();

		// Field names are `slot-<PageContent.id>`, emitted by the <select>s in +page.svelte.
		const validSlots = new Set(
			(await db.select({ id: PageContent.id }).from(PageContent)).map((r) => r.id)
		);
		const validMedia = new Set(
			(await db.select({ id: Media.id }).from(Media)).map((r) => r.id)
		);

		const updates: { id: number; mediaId: number | null }[] = [];
		for (const [key, value] of data.entries()) {
			if (!key.startsWith(SLOT_PREFIX)) continue;

			const id = Number(key.slice(SLOT_PREFIX.length));
			const raw = value.toString();
			const mediaId = raw === '' ? null : Number(raw);

			if (!validSlots.has(id) || (mediaId !== null && !validMedia.has(mediaId))) {
				return fail(HTTP_STATUS_CODES.badRequest, { error: 'Ungültige Eingabe.' });
			}

			updates.push({ id, mediaId });
		}

		try {
			db.transaction((tx) => {
				for (const u of updates) {
					tx.update(PageContent)
						.set({ mediaId: u.mediaId })
						.where(eq(PageContent.id, u.id))
						.run();
				}
			});
		} catch (err) {
			logger.error('PageContent update transaction failed', { error: String(err) });
			return fail(HTTP_STATUS_CODES.internalServerError, {
				error: 'Es kam zu einem Fehler. Bitte laden Sie die Seite neu.'
			});
		}

		logger.info('PageContent slots updated', { count: updates.length });
		return { success: 'Änderungen gespeichert.' };
	}
} satisfies Actions;
