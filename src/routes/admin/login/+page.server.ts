import { db } from '$lib/server/db';
import { USER_URL } from '$env/static/private';
import { redirect, type Actions } from '@sveltejs/kit';
import * as argon2 from 'argon2';
import { Session, User } from '$lib/server/models/Session';
import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(302, '/');
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
		// const user = await fetch(USER_URL)
		// 	.then((response) => response.json())
		// 	.then((json: { userId: number; username: string; password: string }[]) =>
		// 		json.find((user) => user.username === username)
		// 	);

		if (!user) {
			return { success: false };
		}

		const userPassword = await argon2.verify(user[0].password_hash, password);

		if (!userPassword) return { success: false };

		const authToken = crypto.randomUUID();

		db.insert(Session)
			.values({
				user_id: user[0].id,
				last_seen: new Date().getTime(),
				session_key: authToken
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
			maxAge: 60 * 60 * 24 * 7
		});

		redirect(302, '/admin');
	}
} satisfies Actions;
