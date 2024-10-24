import type { Actions } from './$types';

import { Event } from '$lib/server/db';

export const actions = {
	createEvent: async ({ request }) => {
		const data = await request.formData();

		const event = Event.create(Object.fromEntries(data));

		return { success: true };
	}
} satisfies Actions;
