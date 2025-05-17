import { eq, lte } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { Session } from '$lib/server/models/Session';

export const handle: Handle = async ({ event, resolve }) => {
	const SEVEN_DAYS_COOKIE_TTL = 604800;
	const SINGLE_DB_RETURN = 1;
	const EMPTY_DB_RETURN = 0;

	const session = event.cookies.get('session');

	if (!session) return await resolve(event);

	await db
		.delete(Session)
		.where(lte(Session.lastSeen, new Date().getTime() - SEVEN_DAYS_COOKIE_TTL));

	const user = await db
		.select({
			userId: Session.userId
		})
		.from(Session)
		.where(eq(Session.sessionKey, session))
		.limit(SINGLE_DB_RETURN);

	const userInfo = user.length > EMPTY_DB_RETURN ? { name: user[0].userId } : null;

	await db
		.update(Session)
		.set({
			lastSeen: new Date().getTime()
		})
		.where(eq(Session.sessionKey, session));

	event.cookies.set('session', session, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: SEVEN_DAYS_COOKIE_TTL
	});

	if (userInfo) {
		event.locals.user = userInfo;
	}

	return await resolve(event);
};
