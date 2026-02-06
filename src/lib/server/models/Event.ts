import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Media } from './Media';

export const Event = sqliteTable('Event', {
	id: int().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	shortDescription: text(),
	description: text(),
	time: int().notNull(),
	address: text().notNull(),
	songs: text(),
	participants: text()
});
