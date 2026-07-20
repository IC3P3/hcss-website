import { beforeAll, describe, expect, it, vi } from 'vitest';
import { hash } from 'argon2';
import { db } from '$lib/server/db';
import { User } from '$lib/server/models/User';
import { formRequest, migrateTestDb } from '$lib/server/test-helpers';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import { actions } from './+page.server';

type LoginEvent = Parameters<typeof actions.login>[0];

const PASSWORD = 'korrektes-passwort';
const USERNAME = 'login-test-admin';

beforeAll(async () => {
	migrateTestDb();
	await db.insert(User).values({
		username: USERNAME,
		passwordHash: await hash(PASSWORD)
	});
});

function loginEvent(fields: Record<string, string>, ip: string) {
	const cookies = { set: vi.fn(), get: vi.fn(), delete: vi.fn() };
	const event = {
		cookies,
		getClientAddress: () => ip,
		request: formRequest(fields)
	} as unknown as LoginEvent;
	return { event, cookies };
}

describe('login', () => {
	it('rejects an unknown username', async () => {
		const { event } = loginEvent({ username: 'nobody', password: 'x' }, '10.0.0.1');
		await expect(actions.login(event)).resolves.toEqual({ success: false });
	});

	it('rejects a wrong password', async () => {
		const { event } = loginEvent({ username: USERNAME, password: 'falsch' }, '10.0.0.2');
		await expect(actions.login(event)).resolves.toEqual({ success: false });
	});

	it('rejects missing fields', async () => {
		const { event } = loginEvent({ username: USERNAME }, '10.0.0.3');
		await expect(actions.login(event)).resolves.toEqual({ success: false });
	});

	it('redirects and sets a session cookie on success', async () => {
		const { event, cookies } = loginEvent({ username: USERNAME, password: PASSWORD }, '10.0.0.4');
		await expect(actions.login(event)).rejects.toMatchObject({
			status: HTTP_STATUS_CODES.found
		});
		expect(cookies.set).toHaveBeenCalledWith(
			'session',
			expect.any(String),
			expect.objectContaining({ httpOnly: true, sameSite: 'strict' })
		);
	});

	it('rate limits after repeated failures from one address', async () => {
		const MAX_LOGIN_ATTEMPTS = 5;
		const ip = '10.0.0.5';
		for (let i = 0; i < MAX_LOGIN_ATTEMPTS; i++) {
			const { event } = loginEvent({ username: USERNAME, password: 'falsch' }, ip);
			await actions.login(event);
		}

		const { event } = loginEvent({ username: USERNAME, password: PASSWORD }, ip);
		await expect(actions.login(event)).resolves.toMatchObject({
			status: HTTP_STATUS_CODES.tooManyRequests
		});
	});
});
