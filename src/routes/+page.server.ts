import { eq, gte } from 'drizzle-orm';
import { Content } from '$lib/server/models/Content';
import { db } from '$lib/server/db';
import { Event } from '$lib/server/models/Event';
import { Media } from '$lib/server/models/Media';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const STARTPAGE_ID = 1;

	const events = await db
		.select()
		.from(Event)
		.where(gte(Event.time, new Date().getTime()))
		.orderBy(Event.time);

	const content = await db
		.select({
			id: Content.id,
			mediaId: Media.id,
			subtitle: Media.subtitle,
			contentId: Content.id
		})
		.from(Media)
		.innerJoin(Content, eq(Content.mediaId, Media.id))
		.where(eq(Content.categoryId, STARTPAGE_ID));

	return {
		events: events,
		content: content
	};
};
