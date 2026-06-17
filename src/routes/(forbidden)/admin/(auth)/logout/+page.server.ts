import { type Actions, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { Session } from '$lib/server/models/User';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import { resolve } from '$app/paths';

export const load = () => {
	redirect(HTTP_STATUS_CODES.found, resolve('/'));
};

export const actions = {
	default: async ({ cookies }) => {
		const sessionCookie = cookies.get('session');
		if (sessionCookie) {
			await db
				.delete(Session)
				.where(eq(Session.sessionKey, sessionCookie))
				.catch(() => {
					// TODO: Add proper logging
				});

			cookies.delete('session', {
				path: '/'
			});
		}

		redirect(HTTP_STATUS_CODES.found, resolve('/'));
	}
} satisfies Actions;
