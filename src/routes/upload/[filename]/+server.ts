import { UPLOAD_PATH } from '$env/static/private';
import { HTTP_STATUS_CODES, ONE_YEAR_IN_S } from '$lib/server/utils/constants';
import { error } from '@sveltejs/kit';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { Readable } from 'node:stream';
import type { RequestHandler } from './$types';

const MIME_TYPES: Record<string, string> = {
	'.webp': 'image/webp',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.gif': 'image/gif',
	'.avif': 'image/avif',
	'.svg': 'image/svg+xml'
};

export const GET: RequestHandler = async ({ params }) => {
	const { filename } = params;

	if (!filename || basename(filename) !== filename) {
		error(HTTP_STATUS_CODES.notFound, 'Not found');
	}

	const filepath = join(process.cwd(), UPLOAD_PATH, filename);

	let fileStat = null;
	try {
		fileStat = await stat(filepath);
	} catch {
		error(HTTP_STATUS_CODES.notFound, 'Not found');
	}
	if (!fileStat.isFile()) {
		error(HTTP_STATUS_CODES.notFound, 'Not found');
	}

	const contentType = MIME_TYPES[extname(filename).toLowerCase()] ?? 'application/octet-stream';
	const stream = Readable.toWeb(createReadStream(filepath)) as ReadableStream;

	return new Response(stream, {
		headers: {
			'Content-Type': contentType,
			'Content-Length': String(fileStat.size),
			'Cache-Control': `public, max-age=${ONE_YEAR_IN_S}, immutable`
		}
	});
};
