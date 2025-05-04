import { dev } from '$app/environment';
import { db } from '$lib/server/db';
import { Session } from '$lib/server/models/Session';
import type { Handle } from '@sveltejs/kit';
import { eq, lte } from 'drizzle-orm';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (!session) return await resolve(event);

	await db.delete(Session).where(lte(Session.last_seen, new Date().getTime() - 60 * 60 * 24 * 7));

	const user = await db
		.select({
			user_id: Session.user_id
		})
		.from(Session)
		.where(eq(Session.session_key, session))
		.limit(1);

	if (user) {
		event.locals.user = {
			name: user[0].user_id
		};
	}

	await db
		.update(Session)
		.set({
			last_seen: new Date().getTime()
		})
		.where(eq(Session.session_key, session));

	event.cookies.set('session', session, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: 60 * 60 * 24 * 7
	});

	return await resolve(event);
};
