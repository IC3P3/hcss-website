import type { RequestEvent } from '@sveltejs/kit';

export function GET({ request }: RequestEvent) {
	const FIRST_ELEMENT = 0;
	const LAST_ELEMENT = -1;

	const host = request.headers.get('host') || 'https://hcss-ev.de';
	const routes = import.meta.glob('/src/routes/**/+page.svelte', {
		eager: true,
		import: 'default'
	});

	const pages = Object.keys(routes)
		.filter((filepath) => {
			return !filepath.includes('(forbidden)');
		})
		.map((filepath) => {
			return filepath
				.replace('/src/routes/', '')
				.replace('+page.svelte', '')
				.replaceAll(/\(.*?\)\//g, '')
				.slice(FIRST_ELEMENT, LAST_ELEMENT);
		});

	const body = sitemap(pages, host);
	const response = new Response(body);

	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'application/xml');

	return response;
}

const sitemap = (pages: string[], host: string) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
	${pages
		.map(
			(page) => `
		<url>
			<loc>${host}/${page}</loc>
			<changefreq>monthly</changefreq>
		</url>
  `
		)
		.join('')}
</urlset>
`;
