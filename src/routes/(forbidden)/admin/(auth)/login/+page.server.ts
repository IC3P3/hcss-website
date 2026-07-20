import { type Actions, fail, redirect } from '@sveltejs/kit';
import { Session, User } from '$lib/server/models/User';
import { db } from '$lib/server/db';
import { dev } from '$app/environment';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import {
	FIFTEEN_MINUTES_IN_MS,
	HTTP_STATUS_CODES,
	THREE_DAYS_IN_S
} from '$lib/server/utils/constants';
import { generateSessionToken } from '$lib/server/utils/session';
import { logger } from '$lib/server/utils/logger';
import { createRateLimiter } from '$lib/server/utils/rate-limit';

const MAX_LOGIN_ATTEMPTS = 5;
const loginLimiter = createRateLimiter(MAX_LOGIN_ATTEMPTS, FIFTEEN_MINUTES_IN_MS);
import { verify } from 'argon2';
import { resolve } from '$app/paths';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) {
		redirect(HTTP_STATUS_CODES.found, resolve('/admin'));
	}
};

export const actions = {
	login: async ({ cookies, getClientAddress, request }) => {
		const ip = getClientAddress();
		if (loginLimiter.isLimited(ip)) {
			logger.warn('Login rate limited', { ip });
			return fail(HTTP_STATUS_CODES.tooManyRequests, {
				error: 'Zu viele Anmeldeversuche. Bitte versuchen Sie es später erneut.'
			});
		}

		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password)
			return { success: false };

		const user = await db.select().from(User).where(eq(User.username, username)).limit(1);
		if (user.length === 0) {
			// Verify against a dummy hash so response time doesn't reveal whether a
			// username exists (defends against timing-based user enumeration).
			await verify(
				'$argon2id$v=19$m=512,t=8,p=2$TWNJcE5rbUlTZEdTRTN4VQ$7UYi+J7HKfNyIKjiuW2SttAvRlhb8Fy5gH2rkFUNPMg',
				'no'
			);
			logger.warn('Login failed: unknown username', { username, ip });
			loginLimiter.registerFailure(ip);
			return { success: false };
		}

		try {
			const userPassword = await verify(user[0].passwordHash, password);
			if (!userPassword) {
				logger.warn('Login failed: wrong password', { username, ip });
				loginLimiter.registerFailure(ip);
				return { success: false };
			}
		} catch (err) {
			logger.error('Password verification failed', { username, error: String(err) });
			return { success: false };
		}

		const sessionToken = generateSessionToken();

		try {
			await db.insert(Session).values({
				userId: user[0].id,
				lastSeen: Date.now(),
				sessionKey: sessionToken
			});
		} catch (err) {
			logger.error('Session insert failed', { username, error: String(err) });
			return { success: false };
		}

		loginLimiter.reset(ip);
		logger.info('Login succeeded', { username, ip });

		cookies.set('session', sessionToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: !dev,
			maxAge: THREE_DAYS_IN_S
		});

		redirect(HTTP_STATUS_CODES.found, resolve('/admin'));
	}
} satisfies Actions;
