import type { PageServerLoad } from './$types';

import { Sequelize } from 'sequelize';

import { Content, Media } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const media = await Media.findAll({
		attributes: ['id', 'subtitle'],
		raw: true
	});

	const content = await Content.findAll({
		raw: true
	});

	const categories = await Content.findAll({
		attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category']],
		raw: true
	});

	return {
		images: media,
		content: content,
		contentCategories: categories
	};
};
