import { blob, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Event } from './Event';

export const Media = sqliteTable('Media', {
	id: int().primaryKey({ autoIncrement: true }),
	subtitle: text(),
	image: blob().notNull(),
	eventId: int().references(() => Event.id, { onDelete: 'set null' })
});
