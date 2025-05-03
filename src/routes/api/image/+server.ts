import { db } from '$lib/server/db';
import { Media } from '$lib/server/models/Media';
import { eq } from 'drizzle-orm';

export async function GET({ url }: { url: URL }) {
	const id = url.searchParams.get('id');

	if (id === null) {
		return {
			status: 400,
			body: { error: 'no id found' }
		};
	}

	const image = await db
		.select({ image: Media.image })
		.from(Media)
		.where(eq(Media.id, Number(id)))
		.limit(1);

	if (!image || image.length === 0) {
		return {
			status: 404,
			body: { error: 'Image not found' }
		};
	}

	if (!Buffer.isBuffer(image[0].image)) {
		return {
			status: 500,
			body: { error: 'Image corrupted' }
		};
	}

	const blob = new Blob([image[0].image], { type: 'image/webp' });

	return new Response(blob, {
		status: 200,
		headers: {
			'Content-Type': 'image/webp'
		}
	});
}
