import { beforeAll, describe, expect, it, vi } from 'vitest';
import { hash } from 'argon2';
import { db } from '$lib/server/db';
import { Session, User } from '$lib/server/models/User';
import { migrateTestDb } from '$lib/server/test-helpers';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import { handle } from './hooks.server';

type HandleInput = Parameters<typeof handle>[0];
type MockEvent = HandleInput['event'];

const SESSION_KEY = 'test-session-token';

beforeAll(async () => {
	migrateTestDb();
	const users = await db
		.insert(User)
		.values({ username: 'hooks-test-admin', passwordHash: await hash('pw') })
		.returning({ id: User.id });
	await db.insert(Session).values({
		userId: users[0].id,
		sessionKey: SESSION_KEY,
		lastSeen: Date.now()
	});
});

function makeEvent(overrides: { routeId: string; method?: string; session?: string }): MockEvent {
	return {
		cookies: {
			get: () => overrides.session,
			set: vi.fn(),
			delete: vi.fn()
		},
		route: { id: overrides.routeId },
		request: new Request('http://localhost/admin', { method: overrides.method ?? 'GET' }),
		url: new URL('http://localhost/admin'),
		locals: {},
		getClientAddress: () => '127.0.0.1'
	} as unknown as MockEvent;
}

const resolveOk = vi.fn(() => new Response('ok'));

describe('protected route guard', () => {
	it('redirects unauthenticated GET requests', async () => {
		const event = makeEvent({ routeId: '/(forbidden)/admin/(protected)' });
		await expect(handle({ event, resolve: resolveOk })).rejects.toMatchObject({
			status: HTTP_STATUS_CODES.found
		});
	});

	it('blocks unauthenticated POST requests with 401', async () => {
		const event = makeEvent({
			routeId: '/(forbidden)/admin/(protected)/create-event',
			method: 'POST'
		});
		await expect(handle({ event, resolve: resolveOk })).rejects.toMatchObject({
			status: HTTP_STATUS_CODES.unauthorized
		});
	});

	it('lets a valid session through and sets locals.user', async () => {
		const event = makeEvent({
			routeId: '/(forbidden)/admin/(protected)',
			method: 'POST',
			session: SESSION_KEY
		});
		const response = await handle({ event, resolve: resolveOk });
		expect(response.status).toBe(HTTP_STATUS_CODES.ok);
		expect(event.locals.user).toEqual({ id: expect.any(Number) });
	});

	it('ignores unauthenticated requests to public routes', async () => {
		const event = makeEvent({ routeId: '/(public)' });
		const response = await handle({ event, resolve: resolveOk });
		expect(response.status).toBe(HTTP_STATUS_CODES.ok);
	});

	it('rejects an expired or unknown session on protected routes', async () => {
		const event = makeEvent({
			routeId: '/(forbidden)/admin/(protected)',
			session: 'unbekannter-token'
		});
		await expect(handle({ event, resolve: resolveOk })).rejects.toMatchObject({
			status: HTTP_STATUS_CODES.found
		});
		expect(event.cookies.delete).toHaveBeenCalled();
	});
});
