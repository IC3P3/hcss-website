import { type Actions, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { Session } from '$lib/server/models/Session';

const HTTP_FOUND = 302;

export const load = () => {
	redirect(HTTP_FOUND, '/');
};

export const actions = {
	default: async ({ cookies }) => {
		await db
			.delete(Session)
			.where(eq(Session.sessionKey, cookies.get('session') || ''))
			.catch((err) => {
				console.error(err);
			});

		cookies.delete('session', {
			path: '/'
		});

		redirect(HTTP_FOUND, '/');
	}
} satisfies Actions;
