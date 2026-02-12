import { db } from '$lib/server/db';
import { Media } from '$lib/server/models/Media';
import { PageContent } from '$lib/server/models/PageContent';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { HERO_IMAGE } from '$lib/server/utils/pagecontent_constants';
import { join } from 'path';
import { UPLOAD_PATH } from '$env/static/private';

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

	return { heroImg };
};
