import { db } from '$lib/server/db';
import { Event } from '$lib/server/models/Event';
import { Media } from '$lib/server/models/Media';
import { PageContent } from '$lib/server/models/PageContent';
import { asc, count, gt, isNotNull, isNull, lte } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const now = Date.now();

	const [mediaTotal] = await db.select({ n: count() }).from(Media);
	const [mediaUnassigned] = await db
		.select({ n: count() })
		.from(Media)
		.where(isNull(Media.eventId));
	const [eventsUpcoming] = await db.select({ n: count() }).from(Event).where(gt(Event.time, now));
	const [eventsPast] = await db.select({ n: count() }).from(Event).where(lte(Event.time, now));
	const [slotsTotal] = await db.select({ n: count() }).from(PageContent);
	const [slotsFilled] = await db
		.select({ n: count() })
		.from(PageContent)
		.where(isNotNull(PageContent.mediaId));
	const [nextEvent] = await db
		.select({ title: Event.title, time: Event.time })
		.from(Event)
		.where(gt(Event.time, now))
		.orderBy(asc(Event.time))
		.limit(1);

	return {
		stats: {
			mediaTotal: mediaTotal.n,
			mediaUnassigned: mediaUnassigned.n,
			eventsUpcoming: eventsUpcoming.n,
			eventsPast: eventsPast.n,
			slotsTotal: slotsTotal.n,
			slotsFilled: slotsFilled.n,
			nextEvent: nextEvent ?? null
		}
	};
};
