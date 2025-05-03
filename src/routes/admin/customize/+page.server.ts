import { db } from '$lib/server/db';
import { Category, Content } from '$lib/server/models/Content';
import { Media } from '$lib/server/models/Media';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

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
			.limit(1);

		if (content.length === 0) return { success: false };

		await db
			.update(Content)
			.set({ media_id: changedValue.imageSelection })
			.where(eq(Content.id, changedValue.imageId))
			.limit(1)
			.catch((err) => {
				console.error(err);
				return { success: false };
			});
	}
} satisfies Actions;
