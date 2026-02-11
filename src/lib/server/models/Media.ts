import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Event } from './Event';

export const Media = sqliteTable('Media', {
	id: int().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	description: text(),
	slug: text().unique(),
	path: text().notNull(),
	role: int().default(0),
	eventId: int().references(() => Event.id, { onDelete: 'set null' })
});
