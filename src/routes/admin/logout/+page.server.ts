import { db } from '$lib/server/db';
import { Session } from '$lib/server/models/Session';
import { type Actions, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = () => {
	redirect(302, '/');
};

export const actions = {
	default: async ({ cookies }) => {
		await db
			.delete(Session)
			.where(eq(Session.session_key, cookies.get('session') || ''))
			.catch((err) => {
				console.error(err);
			});

		cookies.delete('session', {
			path: '/'
		});

		redirect(302, '/');
	}
} satisfies Actions;
