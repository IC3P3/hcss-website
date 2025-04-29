import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Media } from './Media';

export const Content = sqliteTable('Content', {
	id: int().primaryKey({ autoIncrement: true }),
	displayName: text(),
	category_id: int()
		.references(() => Category.id, { onDelete: 'cascade' })
		.notNull(),
	media_id: int().references(() => Media.id, { onDelete: 'set null' })
});

export const Category = sqliteTable('Category', {
	id: int().primaryKey({ autoIncrement: true }),
	displayName: text()
});
