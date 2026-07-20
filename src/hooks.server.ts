import { and, eq, gt, lt } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { dev } from '$app/environment';
import { error, redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { resolve as resolvePath } from '$app/paths';
import { Session } from '$lib/server/models/User';
import { generateSessionToken } from '$lib/server/utils/session';
import {
	HTTP_STATUS_CODES,
	ONE_DAY_IN_MS,
	THIRTY_MINUTES_IN_MS,
	THREE_DAYS_IN_MS,
	THREE_DAYS_IN_S
} from '$lib/server/utils/constants';

const cleanup = { lastRun: 0 };

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (session) {
		await authenticate(event, session);
	}

	if (event.route.id?.includes('/(protected)') && !event.locals.user) {
		if (event.request.method === 'GET') {
			redirect(HTTP_STATUS_CODES.found, resolvePath('/'));
		}
		error(HTTP_STATUS_CODES.unauthorized, 'Nicht angemeldet.');
	}

	return await resolve(event);
};

async function authenticate(event: RequestEvent, session: string) {
	const dateNow = Date.now();
	// Sweep expired sessions at most once per day (not on every request);
	// reset lastRun on failure so the next request retries.
	if (cleanup.lastRun < dateNow - ONE_DAY_IN_MS) {
		cleanup.lastRun = dateNow;
		db.delete(Session)
			.where(lt(Session.lastSeen, dateNow - THREE_DAYS_IN_MS))
			.catch(() => (cleanup.lastRun = 0));
	}

	const user = await db
		.select({
			userId: Session.userId,
			lastSeen: Session.lastSeen
		})
		.from(Session)
		.where(
			and(eq(Session.sessionKey, session), gt(Session.lastSeen, dateNow - THREE_DAYS_IN_MS))
		)
		.limit(1);

	const userInfo = user.length > 0 ? { id: user[0].userId } : null;

	if (!userInfo) {
		event.cookies.delete('session', {
			path: '/'
		});

		return;
	}

	if (user[0].lastSeen + THIRTY_MINUTES_IN_MS < dateNow) {
		const newSessionToken = generateSessionToken();

		const result = await db
			.update(Session)
			.set({
				sessionKey: newSessionToken,
				lastSeen: dateNow
			})
			.where(eq(Session.sessionKey, session));

		if (result.changes > 0) {
			event.cookies.set('session', newSessionToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: !dev,
				maxAge: THREE_DAYS_IN_S
			});
		}
	}

	event.locals.user = userInfo;
}
