import type { PageServerLoad, Actions } from './$types';

import { Category, Content, Media } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const media = await Media.findAll({
		attributes: ['id', 'subtitle'],
		raw: true
	});

	const content = await Content.findAll({
		raw: true
	});

	const categories = await Category.findAll({
		raw: true
	});

	return {
		images: media,
		content: content,
		contentCategories: categories
	};
};

export const actions = {
	default: async ({ request }) => {
		// FIX: Ones more Typescript shenanigans
		const data = await request.formData();
		const changeValue = Object.fromEntries(data);

		const content = await Content.findByPk(changeValue.imageId);

		if (content) {
			// Update only the media_id field
			content.media_id = changeValue.imageSelection;

			// Save the content, but only update the media_id field by specifying it explicitly
			await content.save({ fields: ['media_id'] });
		}

		return { success: true };
	}
} satisfies Actions;
