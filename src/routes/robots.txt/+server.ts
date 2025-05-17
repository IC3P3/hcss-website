import type { RequestEvent } from '@sveltejs/kit';

export function GET({ request }: RequestEvent) {
	const host = request.headers.get('host') || 'https://hcss-ev.de';
	const files = import.meta.glob('/src/routes/**/*', { eager: true });

	const disallowedPages = Object.keys(files).filter((path) => path.includes('/(forbidden)/'));
	const forbiddenRoutes = extractTopLevelRoutes(disallowedPages);

	const body = robots(forbiddenRoutes, host);
	const response = new Response(body);

	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'text/plain');

	return response;
}

function extractTopLevelRoutes(disallowedPages: string[]): string[] {
	const uniqueRoutes = new Set<string>();

	disallowedPages.forEach((page) => {
		const NO_FORBIDDEN_PAGES = -1;

		const relativePath = page.replace('/src/routes/', '');

		const forbiddenIndex = relativePath.indexOf('(forbidden)/');
		if (forbiddenIndex !== NO_FORBIDDEN_PAGES) {
			const remaining = relativePath.substring(forbiddenIndex + '(forbidden)/'.length);

			const topLevel = remaining.split('/')[0];
			if (topLevel) {
				uniqueRoutes.add(`/${topLevel}`);
			}
		}
	});

	return Array.from(uniqueRoutes).sort();
}

const robots = (forbiddenRoutes: string[], host: string) => `User-agent: *
Sitemap: ${host}/sitemap.xml
${forbiddenRoutes.map((route) => `Disallow: ${route}`).join('\n')}`;
