import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const Event = sqliteTable('Event', {
	id: int().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	subtitle: text(),
	address: text().notNull(),
	time: int().notNull()
});
