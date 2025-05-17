import { Category, Content } from '$lib/server/models/Content';
import type { Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { Media } from '$lib/server/models/Media';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const media = await db
		.select({
			id: Media.id,
			subtitle: Media.subtitle
		})
		.from(Media);

	const content = await db.select().from(Content);

	const categories = await db.select().from(Category);

	return {
		media: media,
		content: content,
		contentCategories: categories
	};
};

export const actions = {
	default: async ({ request }) => {
		const SINGLE_DB_RETURN = 1;
		const NO_CONTENT = 0;

		const data = await request.formData();
		const formEntries = Object.fromEntries(data);

		const changedValue: { imageId: string; imageSelection: number } = {
			imageId: formEntries.imageId.toString(),
			imageSelection: Number(formEntries.imageSelection)
		};

		const content = await db
			.select()
			.from(Content)
			.where(eq(Content.id, changedValue.imageId))
			.limit(SINGLE_DB_RETURN);

		if (content.length === NO_CONTENT) return { success: false };

		await db
			.update(Content)
			.set({ mediaId: changedValue.imageSelection })
			.where(eq(Content.id, changedValue.imageId))
			.limit(SINGLE_DB_RETURN)
			.catch((err) => {
				console.error(err);
				return { success: false };
			});
	}
} satisfies Actions;
