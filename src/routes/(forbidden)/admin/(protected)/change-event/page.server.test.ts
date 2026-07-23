import { beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { Event } from '$lib/server/models/Event';
import { formRequest, migrateTestDb } from '$lib/server/test-helpers';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import { actions } from './+page.server';

type UpdateEvent = Parameters<typeof actions.update>[0];
type DeleteEvent = Parameters<typeof actions.delete>[0];

beforeAll(() => {
	migrateTestDb();
});

async function seedEvent(): Promise<number> {
	const rows = await db
		.insert(Event)
		.values({ title: 'Konzert', time: Date.now(), address: 'Kirchplatz 3, Helmstedt' })
		.returning({ id: Event.id });
	return rows[0].id;
}

describe('update', () => {
	it('updates an existing event', async () => {
		const id = await seedEvent();
		const result = await actions.update({
			request: formRequest({
				id: String(id),
				title: 'Neuer Titel',
				time: '2030-01-01T19:00',
				address: 'Neue Adresse 1'
			})
		} as unknown as UpdateEvent);

		expect(result).toMatchObject({ success: expect.any(String) });
		const [row] = await db.select().from(Event).where(eq(Event.id, id));
		expect(row.title).toBe('Neuer Titel');
		expect(row.address).toBe('Neue Adresse 1');
	});

	it('rejects a missing title', async () => {
		const id = await seedEvent();
		const result = await actions.update({
			request: formRequest({ id: String(id), time: '2030-01-01T19:00', address: 'A' })
		} as unknown as UpdateEvent);

		expect(result).toMatchObject({ status: HTTP_STATUS_CODES.badRequest });
	});

	it('rejects an invalid time', async () => {
		const id = await seedEvent();
		const result = await actions.update({
			request: formRequest({ id: String(id), title: 'T', time: 'kein-datum', address: 'A' })
		} as unknown as UpdateEvent);

		expect(result).toMatchObject({ status: HTTP_STATUS_CODES.badRequest });
	});

	it('fails on an unknown id', async () => {
		const result = await actions.update({
			request: formRequest({
				id: '999999',
				title: 'T',
				time: '2030-01-01T19:00',
				address: 'A'
			})
		} as unknown as UpdateEvent);

		expect(result).toMatchObject({ status: HTTP_STATUS_CODES.notFound });
	});
});

describe('delete', () => {
	it('deletes an existing event', async () => {
		const id = await seedEvent();
		const result = await actions.delete({
			request: formRequest({ id: String(id) })
		} as unknown as DeleteEvent);

		expect(result).toMatchObject({ success: expect.any(String) });
		const rows = await db.select().from(Event).where(eq(Event.id, id));
		expect(rows).toHaveLength(0);
	});

	it('fails on an unknown id', async () => {
		const result = await actions.delete({
			request: formRequest({ id: '999999' })
		} as unknown as DeleteEvent);

		expect(result).toMatchObject({ status: HTTP_STATUS_CODES.notFound });
	});

	it('rejects an invalid id', async () => {
		const result = await actions.delete({
			request: formRequest({ id: 'abc' })
		} as unknown as DeleteEvent);

		expect(result).toMatchObject({ status: HTTP_STATUS_CODES.badRequest });
	});
});
