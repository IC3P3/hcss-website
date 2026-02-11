import { resolve } from '$app/paths';
import { HTTP_FOUND } from '$lib/server/utils/constants';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = ({ locals }) => {
	if (!locals.user) {
		redirect(HTTP_FOUND, resolve('/'));
	}
};
