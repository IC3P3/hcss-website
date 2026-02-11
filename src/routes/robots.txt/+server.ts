import { HOST_URL } from '$env/static/private';
import { NOT_FOUND } from '$lib/server/utils/constants';

export function GET() {
	const files = import.meta.glob('/src/routes/**/*');

	const disallowedPages = Object.keys(files).filter((path) => path.includes('/(forbidden)/'));
	const forbiddenRoutes = extractTopLevelRoutes(disallowedPages);

	const body = robots(forbiddenRoutes, HOST_URL);
	const response = new Response(body);

	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'text/plain');

	return response;
}

function extractTopLevelRoutes(disallowedPages: string[]): string[] {
	const uniqueRoutes = new Set<string>();

	disallowedPages.forEach((page) => {
		const relativePath = page.replace('/src/routes/', '');

		const forbiddenIndex = relativePath.indexOf('(forbidden)/');
		if (forbiddenIndex !== NOT_FOUND) {
			const remaining = relativePath.substring(forbiddenIndex + '(forbidden)/'.length);

			const topLevel = remaining.split('/')[0];
			if (topLevel) {
				uniqueRoutes.add(`/${topLevel}`);
			}
		}
	});

	return Array.from(uniqueRoutes).sort();
}

const robots = (forbiddenRoutes: string[], address: string) => `User-agent: *
Sitemap: ${address}/sitemap.xml
Allow: /
${forbiddenRoutes.map((route) => `Disallow: ${route}`).join('\n')}`;
