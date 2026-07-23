import { beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { Event } from '$lib/server/models/Event';
import { Media } from '$lib/server/models/Media';
import { formRequest, migrateTestDb } from '$lib/server/test-helpers';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import { actions } from './+page.server';

type UpdateEvent = Parameters<typeof actions.update>[0];
type DeleteEvent = Parameters<typeof actions.delete>[0];

beforeAll(() => {
	migrateTestDb();
});

async function seedMedia(): Promise<number> {
	const rows = await db
		.insert(Media)
		.values({ title: 'Bild', path: `${crypto.randomUUID()}.webp` })
		.returning({ id: Media.id });
	return rows[0].id;
}

describe('update', () => {
	it('updates title, description and event link', async () => {
		const id = await seedMedia();
		const eventRows = await db
			.insert(Event)
			.values({ title: 'Konzert', time: Date.now(), address: 'A' })
			.returning({ id: Event.id });

		const result = await actions.update({
			request: formRequest({
				id: String(id),
				title: 'Neues Bild',
				description: 'Beschreibung',
				event: String(eventRows[0].id)
			})
		} as unknown as UpdateEvent);

		expect(result).toMatchObject({ success: expect.any(String) });
		const [row] = await db.select().from(Media).where(eq(Media.id, id));
		expect(row).toMatchObject({
			title: 'Neues Bild',
			description: 'Beschreibung',
			eventId: eventRows[0].id
		});
	});

	it('clears the event link when none is selected', async () => {
		const id = await seedMedia();
		const result = await actions.update({
			request: formRequest({ id: String(id), title: 'Bild', event: '' })
		} as unknown as UpdateEvent);

		expect(result).toMatchObject({ success: expect.any(String) });
		const [row] = await db.select().from(Media).where(eq(Media.id, id));
		expect(row.eventId).toBeNull();
	});

	it('rejects a missing title', async () => {
		const id = await seedMedia();
		const result = await actions.update({
			request: formRequest({ id: String(id) })
		} as unknown as UpdateEvent);

		expect(result).toMatchObject({ status: HTTP_STATUS_CODES.badRequest });
	});

	it('fails on an unknown id', async () => {
		const result = await actions.update({
			request: formRequest({ id: '999999', title: 'T' })
		} as unknown as UpdateEvent);

		expect(result).toMatchObject({ status: HTTP_STATUS_CODES.notFound });
	});
});

describe('delete', () => {
	it('deletes the row even when the file is already gone', async () => {
		const id = await seedMedia();
		const result = await actions.delete({
			request: formRequest({ id: String(id) })
		} as unknown as DeleteEvent);

		expect(result).toMatchObject({ success: expect.any(String) });
		const rows = await db.select().from(Media).where(eq(Media.id, id));
		expect(rows).toHaveLength(0);
	});

	it('fails on an unknown id', async () => {
		const result = await actions.delete({
			request: formRequest({ id: '999999' })
		} as unknown as DeleteEvent);

		expect(result).toMatchObject({ status: HTTP_STATUS_CODES.notFound });
	});
});
