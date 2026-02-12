import { db } from '$lib/server/db';
import { Media } from '$lib/server/models/Media';
import { PageContent } from '$lib/server/models/PageContent';
import { between, eq, gt } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import {
	FRONT_PAGE_MEDIA_END,
	FRONT_PAGE_MEDIA_START,
	HERO_IMAGE
} from '$lib/server/utils/pagecontent_constants';
import { join } from 'path';
import { UPLOAD_PATH } from '$env/static/private';
import { Event } from '$lib/server/models/Event';

export const load: PageServerLoad = async () => {
	const [heroImgResult] = await db
		.select({
			path: Media.path,
			description: Media.description
		})
		.from(PageContent)
		.leftJoin(Media, eq(Media.id, PageContent.mediaId))
		.where(eq(PageContent.id, HERO_IMAGE));
	const heroImg = heroImgResult
		? {
				...heroImgResult,
				path: heroImgResult.path ? join(UPLOAD_PATH, heroImgResult.path) : null
			}
		: null;

	const MAX_NUMBER_EVENTS = 4;
	const events = await db
		.select({
			id: Event.id,
			title: Event.title,
			shortDescription: Event.shortDescription,
			time: Event.time,
			address: Event.address
		})
		.from(Event)
		.where(gt(Event.time, Date.now()))
		.limit(MAX_NUMBER_EVENTS);

	const mediaResults = await db
		.select({
			id: PageContent.id,
			title: Media.title,
			description: Media.description,
			path: Media.path
		})
		.from(PageContent)
		.leftJoin(Media, eq(Media.id, PageContent.mediaId))
		.where(between(PageContent.id, FRONT_PAGE_MEDIA_START, FRONT_PAGE_MEDIA_END));

	const media = mediaResults.map((item) => ({
		...item,
		path: item.path ? join(UPLOAD_PATH, item.path) : null
	}));

	return { heroImg, events, media };
};
