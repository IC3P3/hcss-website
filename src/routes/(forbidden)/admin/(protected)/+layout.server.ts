import { resolve } from '$app/paths';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = ({ locals }) => {
	if (!locals.user) {
		redirect(HTTP_STATUS_CODES.found, resolve('/'));
	}
};
