import type { Actions } from './$types';

import { Event, Media } from '$lib/server/db';

export const actions = {
	createEvent: async ({ request }) => {
		const data = await request.formData();

		// TODO: Add error handling if creating an entry fails
		const event = Event.create(Object.fromEntries(data));

		return { success: true };
	},
	addImage: async ({ request }) => {
		const data = await request.formData();

		const image = data.get('image') as File;
		const arrayBuffer = await image.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// TODO: Errorhandling to prevent server crashes when Foreign Key contraint
		const media = Media.create({
			subtitle: data.get('subtitle'),
			image: buffer,
			event_id: data.get('event_id')
		});

		return { success: true };
	}
} satisfies Actions;
