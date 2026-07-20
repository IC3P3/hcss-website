import { db } from '$lib/server/db';
import { Event } from '$lib/server/models/Event';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import { logger } from '$lib/server/utils/logger';
import { fail, type Actions } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const events = await db.select().from(Event).orderBy(desc(Event.time));

	return { events };
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
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Ungültige Veranstaltung!' });
		}

		const title = data.get('title')?.toString().trim();
		if (!title) {
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Kein Titel angegeben!' });
		}

		const address = data.get('address')?.toString().trim();
		if (!address) {
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Keine Adresse angegeben!' });
		}

		const timeRaw = data.get('time')?.toString();
		const time = timeRaw ? new Date(timeRaw).getTime() : NaN;
		if (Number.isNaN(time)) {
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Ungültiger Zeitpunkt!' });
		}

		const shortDescription = data.get('shortDescription')?.toString().trim() || null;
		const description = data.get('description')?.toString().trim() || null;
		const songs = data.get('songs')?.toString().trim() || null;
		const participants = data.get('participants')?.toString().trim() || null;

		const result = await db
			.update(Event)
			.set({ title, shortDescription, description, time, address, songs, participants })
			.where(eq(Event.id, id));

		if (result.changes === 0) {
			return fail(HTTP_STATUS_CODES.notFound, { error: 'Veranstaltung nicht gefunden!' });
		}

		logger.info('Event updated', { id, title });
		return { success: 'Die Veranstaltung wurde gespeichert.' };
	},

	delete: async ({ request }) => {
		const data = await request.formData();

		const id = parseId(data.get('id'));
		if (id === null) {
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Ungültige Veranstaltung!' });
		}

		const result = await db.delete(Event).where(eq(Event.id, id));
		if (result.changes === 0) {
			return fail(HTTP_STATUS_CODES.notFound, { error: 'Veranstaltung nicht gefunden!' });
		}

		logger.info('Event deleted', { id });
		return { success: 'Die Veranstaltung wurde gelöscht.' };
	}
} satisfies Actions;
