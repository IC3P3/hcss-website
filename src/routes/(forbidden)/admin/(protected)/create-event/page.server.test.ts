import { beforeAll, describe, expect, it } from 'vitest';
import { db } from '$lib/server/db';
import { Event } from '$lib/server/models/Event';
import { formRequest, migrateTestDb } from '$lib/server/test-helpers';
import { HTTP_STATUS_CODES } from '$lib/server/utils/constants';
import { actions } from './+page.server';

type CreateEvent = Parameters<typeof actions.default>[0];

beforeAll(() => {
	migrateTestDb();
});

describe('create event', () => {
	it('creates an event with all fields', async () => {
		const result = await actions.default({
			request: formRequest({
				title: 'Weihnachtskonzert',
				time: '2030-12-20T18:00',
				address: 'Stadtkirche, Kirchplatz 3',
				shortDescription: 'Kurz',
				description: 'Lang',
				songs: 'Stille Nacht',
				participants: 'Kinderchor'
			})
		} as unknown as CreateEvent);

		expect(result).toMatchObject({ success: expect.any(String) });
		const rows = await db.select().from(Event);
		const row = rows.find((r) => r.title === 'Weihnachtskonzert');
		expect(row).toMatchObject({
			address: 'Stadtkirche, Kirchplatz 3',
			songs: 'Stille Nacht'
		});
	});

	it('stores empty optional fields as null', async () => {
		await actions.default({
			request: formRequest({
				title: 'Sommerfest',
				time: '2030-06-01T15:00',
				address: 'Klosterstraße 12',
				shortDescription: '',
				description: ''
			})
		} as unknown as CreateEvent);

		const rows = await db.select().from(Event);
		const row = rows.find((r) => r.title === 'Sommerfest');
		expect(row?.shortDescription).toBeNull();
		expect(row?.description).toBeNull();
	});

	it('rejects a missing title', async () => {
		const result = await actions.default({
			request: formRequest({ time: '2030-12-20T18:00', address: 'A' })
		} as unknown as CreateEvent);

		expect(result).toMatchObject({ status: HTTP_STATUS_CODES.badRequest });
	});

	it('rejects a missing address', async () => {
		const result = await actions.default({
			request: formRequest({ title: 'T', time: '2030-12-20T18:00' })
		} as unknown as CreateEvent);

		expect(result).toMatchObject({ status: HTTP_STATUS_CODES.badRequest });
	});

	it('rejects an invalid time', async () => {
		const result = await actions.default({
			request: formRequest({ title: 'T', time: 'gestern', address: 'A' })
		} as unknown as CreateEvent);

		expect(result).toMatchObject({ status: HTTP_STATUS_CODES.badRequest });
	});
});
