import { type Actions, redirect } from '@sveltejs/kit';
import { Session, User } from '$lib/server/models/User';
import { db } from '$lib/server/db';
import { dev } from '$app/environment';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { HTTP_FOUND, THREE_DAYS_IN_S } from '$lib/utils/constants';
import { verify } from 'argon2';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) {
		redirect(HTTP_FOUND, '/');
	}
};

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password)
			return { success: false };

		const user = await db.select().from(User).where(eq(User.username, username)).limit(1);
		if (user.length === 0) {
			await verify(
				'$argon2id$v=19$m=512,t=8,p=2$TWNJcE5rbUlTZEdTRTN4VQ$7UYi+J7HKfNyIKjiuW2SttAvRlhb8Fy5gH2rkFUNPMg',
				'no'
			);
			return { success: false };
		}

		try {
			const userPassword = await verify(user[0].passwordHash, password);
			if (!userPassword) return { success: false };
		} catch {
			// TODO: Proper logging
			return { success: false };
		}

		// TODO: Could be changed to hex or base64 encoded crypto.getRandomValues(new UInt8Array(32))
		// For a 256 bit token instead of a 112 bit token
		const sessionToken = crypto.randomUUID();

		try {
			await db.insert(Session).values({
				userId: user[0].id,
				lastSeen: Date.now(),
				sessionKey: sessionToken
			});
		} catch {
			// TODO: Add proper logging
			return { success: false };
		}

		cookies.set('session', sessionToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: !dev,
			maxAge: THREE_DAYS_IN_S
		});

		redirect(HTTP_FOUND, '/admin');
	}
} satisfies Actions;
