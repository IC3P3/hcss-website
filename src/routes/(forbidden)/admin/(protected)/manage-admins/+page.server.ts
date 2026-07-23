import { db } from '$lib/server/db';
import { User } from '$lib/server/models/User';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import { logger } from '$lib/server/utils/logger';
import { fail, type Actions } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { hash, verify } from 'argon2';
import type { PageServerLoad } from './$types';

const MIN_PASSWORD_LENGTH = 8;

export const load: PageServerLoad = async ({ locals }) => {
	const [me] = await db
		.select({ username: User.username })
		.from(User)
		.where(eq(User.id, locals.user.id))
		.limit(1);

	const admins = await db
		.select({ id: User.id, username: User.username })
		.from(User)
		.orderBy(asc(User.username));

	return { currentUsername: me?.username ?? '', admins };
};

export const actions = {
	createAdmin: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString().trim();
		const password = data.get('password')?.toString();

		if (!username) {
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Kein Benutzername angegeben!' });
		}
		if (!password || password.length < MIN_PASSWORD_LENGTH) {
			return fail(HTTP_STATUS_CODES.badRequest, {
				error: `Das Passwort muss mindestens ${MIN_PASSWORD_LENGTH} Zeichen lang sein.`
			});
		}

		const [existing] = await db
			.select({ id: User.id })
			.from(User)
			.where(eq(User.username, username))
			.limit(1);
		if (existing) {
			return fail(HTTP_STATUS_CODES.badRequest, {
				error: 'Dieser Benutzername ist bereits vergeben.'
			});
		}

		try {
			await db.insert(User).values({ username, passwordHash: await hash(password) });
		} catch (err) {
			logger.error('Admin insert failed', { username, error: String(err) });
			return fail(HTTP_STATUS_CODES.internalServerError, {
				error: 'Es kam zu einem Fehler. Bitte versuchen Sie es erneut.'
			});
		}

		logger.info('Admin created', { username });
		return { success: `Der Administrator "${username}" wurde erstellt.` };
	},

	changeUsername: async ({ request, locals }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString().trim();

		if (!username) {
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Kein Benutzername angegeben!' });
		}

		const [existing] = await db
			.select({ id: User.id })
			.from(User)
			.where(eq(User.username, username))
			.limit(1);
		if (existing && existing.id !== locals.user.id) {
			return fail(HTTP_STATUS_CODES.badRequest, {
				error: 'Dieser Benutzername ist bereits vergeben.'
			});
		}

		try {
			await db.update(User).set({ username }).where(eq(User.id, locals.user.id));
		} catch (err) {
			logger.error('Username change failed', { userId: locals.user.id, error: String(err) });
			return fail(HTTP_STATUS_CODES.internalServerError, {
				error: 'Es kam zu einem Fehler. Bitte versuchen Sie es erneut.'
			});
		}

		logger.info('Username changed', { userId: locals.user.id, username });
		return { success: 'Ihr Benutzername wurde geändert.' };
	},

	changePassword: async ({ request, locals }) => {
		const data = await request.formData();
		const currentPassword = data.get('currentPassword')?.toString();
		const newPassword = data.get('newPassword')?.toString();

		if (!currentPassword || !newPassword) {
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Bitte alle Felder ausfüllen.' });
		}
		if (newPassword.length < MIN_PASSWORD_LENGTH) {
			return fail(HTTP_STATUS_CODES.badRequest, {
				error: `Das neue Passwort muss mindestens ${MIN_PASSWORD_LENGTH} Zeichen lang sein.`
			});
		}

		const [me] = await db
			.select({ passwordHash: User.passwordHash })
			.from(User)
			.where(eq(User.id, locals.user.id))
			.limit(1);
		if (!me) {
			return fail(HTTP_STATUS_CODES.badRequest, { error: 'Benutzer nicht gefunden.' });
		}

		try {
			if (!(await verify(me.passwordHash, currentPassword))) {
				return fail(HTTP_STATUS_CODES.badRequest, {
					error: 'Das aktuelle Passwort ist falsch.'
				});
			}
		} catch (err) {
			logger.error('Password verification failed', {
				userId: locals.user.id,
				error: String(err)
			});
			return fail(HTTP_STATUS_CODES.internalServerError, {
				error: 'Es kam zu einem Fehler. Bitte versuchen Sie es erneut.'
			});
		}

		try {
			await db
				.update(User)
				.set({ passwordHash: await hash(newPassword) })
				.where(eq(User.id, locals.user.id));
		} catch (err) {
			logger.error('Password change failed', { userId: locals.user.id, error: String(err) });
			return fail(HTTP_STATUS_CODES.internalServerError, {
				error: 'Es kam zu einem Fehler. Bitte versuchen Sie es erneut.'
			});
		}

		logger.info('Password changed', { userId: locals.user.id });
		return { success: 'Ihr Passwort wurde geändert.' };
	}
} satisfies Actions;
