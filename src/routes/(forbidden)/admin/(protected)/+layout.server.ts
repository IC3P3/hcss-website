import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = ({ locals }) => {
	const HTTP_FOUND = 302;

	if (!locals.user) {
		redirect(HTTP_FOUND, '/');
	}
};
