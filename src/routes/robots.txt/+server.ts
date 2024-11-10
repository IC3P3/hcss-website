import type { RequestEvent } from '../$types';

export async function GET({ request }: RequestEvent) {
	const host = request.headers.get('host') || 'https://hcss-ev.de';

	const body = robots(host);
	const response = new Response(body);

	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'text/plain');

	return response;
}

const robots = (host: string) => `User-agent: *
Disallow: /api/
Disallow: /admin/
Sitemap: ${host}/sitemap.xml
`;
