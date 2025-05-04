import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { Event } from '$lib/server/models/Event';
import { Media } from '$lib/server/models/Media';

export const actions = {
	createEvent: async ({ request }: { request: Request }) => {
		const data = await request.formData();
		const formEntries = Object.fromEntries(data);

		const newEventEntry: { title: string; subtitle: string; address: string; time: number } = {
			title: String(formEntries.title),
			subtitle: String(formEntries.subtitle),
			address: String(formEntries.address),
			time: new Date(formEntries.time.toString()).getTime()
		};

		await db
			.insert(Event)
			.values(newEventEntry)
			.catch((err) => {
				console.error(err);
				return { success: false };
			});

		return { success: true };
	},
	addImage: async ({ request }: { request: Request }) => {
		const data = await request.formData();

		const image = data.get('image') as File;
		const arrayBuffer = await image.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// TODO: Errorhandling to prevent server crashes when Foreign Key contraint
		db.insert(Media)
			.values({
				subtitle: String(data.get('subtitle')),
				image: buffer,
				event_id: Number(data.get('event_id'))
			})
			.catch((err) => {
				console.error(err);
				return { success: false };
			});

		return { success: true };
	}
} satisfies Actions;

export const load: PageServerLoad = async () => {
	const events = await db
		.select({
			id: Event.id,
			title: Event.title
		})
		.from(Event);

	return {
		events
	};
};
