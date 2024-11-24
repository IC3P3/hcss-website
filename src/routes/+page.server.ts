import type { PageServerLoad } from './$types';
import type { ContentMinimal } from '$lib/types';

import { Op } from 'sequelize';

import { Media, Content, Event } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const events: Event[] = await Event.findAll({
		where: {
			time: {
				[Op.gte]: new Date().getTime()
			}
		},
		order: ['time'],
		raw: true
	});

	// FIX: Add conversion checking to satisfy Typescript
	const content = (await Media.findAll({
		include: {
			model: Content,
			required: true,
			attributes: ['id'],
			where: {
				category: 1
			}
		},
		raw: true,
		attributes: ['subtitle', 'id']
	})) as ContentMinimal[];

	return {
		events: events,
		content: content
	};
};
