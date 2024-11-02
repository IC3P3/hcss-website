import type { PageServerLoad } from './$types';
import type { Content } from '$lib/types';

import { Op } from 'sequelize';

import { Media, HomeContent, Event } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const events: Event[] = await Event.findAll({
		where: {
			time: {
				[Op.gte]: new Date().getTime()
			}
		},
		raw: true
	});

	// TODO: Add conversion checking to satisfy Typescript
	const content = (await Media.findAll({
		include: {
			model: HomeContent,
			required: true,
			attributes: ['id']
		},
		raw: true,
		attributes: ['subtitle', 'id']
	})) as Content[];

	return {
		events: events,
		content: content
	};
};
