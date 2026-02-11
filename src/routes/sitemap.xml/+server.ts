import { HOST_URL } from '$env/static/private';
import { LAST_INDEX } from '$lib/server/utils/constants';
import { escapeXML } from '$lib/server/utils/xml_functions';

export function GET() {
	const routes = import.meta.glob('/src/routes/**/+page.svelte');

	const pages = Object.keys(routes)
		.filter((filepath) => {
			return !filepath.includes('(forbidden)');
		})
		.map((filepath) => {
			return filepath
				.replace('/src/routes/', '')
				.replace('+page.svelte', '')
				.replaceAll(/\(.*?\)\//g, '')
				.slice(0, LAST_INDEX);
		});

	const body = sitemap(pages, HOST_URL);
	const response = new Response(body);

	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'application/xml');

	return response;
}

const sitemap = (pages: string[], host: string) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
>
	${pages
		.map(
			(page) => `
		<url>
			<loc>${escapeXML(`${host}/${page}`)}</loc>
		</url>
  `
		)
		.join('')}
</urlset>
`;
