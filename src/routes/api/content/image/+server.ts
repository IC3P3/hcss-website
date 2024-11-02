import { Op } from 'sequelize';

import { Media } from '$lib/server/db';

export async function GET({ url }: { url: URL }) {
	const params = url.searchParams;

	const image = await Media.findOne({
		where: {
			id: {
				[Op.eq]: params.get('id')
			}
		},
		attributes: ['image'],
		raw: true
	});

	if (!image) {
		return {
			status: 404,
			body: { error: 'Image not found' }
		};
	}

	return new Response(image.image, {
		status: 200,
		headers: {
			'Content-Type': 'image/webp'
		}
	});
}
