import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Event } from './Event';

export const Media = sqliteTable('Media', {
	id: int().primaryKey({ autoIncrement: true }),
	titel: text().notNull(),
	description: text(),
	slug: text().unique(),
	path: text().notNull(),
	displayed: int().notNull(),
	role: int(),
	eventId: int().references(() => Event.id, { onDelete: 'set null' })
});
