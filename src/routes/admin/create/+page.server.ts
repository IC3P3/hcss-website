import type { Actions, PageServerLoad } from './$types';

import { Event, Media } from '$lib/server/db';
import type { EventMinimal } from '$lib/types';

export const actions = {
	createEvent: async ({ request }) => {
		const data = await request.formData();

		// FIX: Tell typescript how this object looks
		const newEvent = Object.fromEntries(data);
		newEvent.time = new Date(newEvent.time).getTime();

		// TODO: Add error handling if creating an entry fails
		const event = await Event.create(newEvent);

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

export const load: PageServerLoad = async () => {
	const events = (await Event.findAll({
		attributes: ['id', 'title'],
		raw: true
	})) satisfies EventMinimal[];

	return { events: events };
};
