import { db } from '$lib/server/db';
import { Event } from '$lib/server/models/Event';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

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

		try {
			await db.insert(Event).values({
				title,
				shortDescription,
				description,
				time,
				address,
				songs,
				participants
			});
		} catch {
			return fail(HTTP_STATUS_CODES.internalServerError, {
				error: 'Es kam zu einem Fehler. Bitte versuchen Sie es erneut.'
			});
		}

		return { success: 'Die Veranstaltung wurde erstellt.' };
	}
} satisfies Actions;
