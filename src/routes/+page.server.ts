import { db } from '$lib/server/db';
import { Event } from '$lib/server/models/Event';
import { eq, gte } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { Media } from '$lib/server/models/Media';
import { Content } from '$lib/server/models/Content';

export const load: PageServerLoad = async () => {
	const events = await db
		.select()
		.from(Event)
		.where(gte(Event.time, new Date().getTime()))
		.orderBy(Event.time);

	const content = await db
		.select({
			media_id: Media.id,
			subtitle: Media.subtitle,
			content_id: Content.id
		})
		.from(Media)
		.innerJoin(Content, eq(Content.media_id, Media.id))
		.where(eq(Content.category_id, 1));

	return {
		events: events,
		content: content
	};
};
