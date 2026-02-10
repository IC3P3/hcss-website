import { type Actions, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { Session } from '$lib/server/models/User';
import { HTTP_FOUND } from '$lib/utils/constants';

export const load = () => {
	redirect(HTTP_FOUND, '/');
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

		redirect(HTTP_FOUND, '/');
	}
} satisfies Actions;
