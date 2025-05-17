import * as argon2 from 'argon2';
import { type Actions, redirect } from '@sveltejs/kit';
import { Session, User } from '$lib/server/models/Session';
import { db } from '$lib/server/db';
import { dev } from '$app/environment';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

const HTTP_FOUND = 302;
const SINGLE_DB_RETURN = 1;
const SEVEN_DAYS_COOKIE_TTL = 604800;

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

		const user = await db
			.select()
			.from(User)
			.where(eq(User.username, username))
			.limit(SINGLE_DB_RETURN);

		if (!user) {
			return { success: false };
		}

		const userPassword = await argon2.verify(user[0].passwordHash, password);

		if (!userPassword) return { success: false };

		const authToken = crypto.randomUUID();

		db.insert(Session)
			.values({
				userId: user[0].id,
				lastSeen: new Date().getTime(),
				sessionKey: authToken
			})
			.catch((err) => {
				console.error(err);
				return { success: false };
			});

		cookies.set('session', authToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: !dev,
			maxAge: SEVEN_DAYS_COOKIE_TTL
		});

		redirect(HTTP_FOUND, '/admin');
	}
} satisfies Actions;
