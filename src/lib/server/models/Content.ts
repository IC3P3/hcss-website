import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Media } from './Media';

export const Content = sqliteTable('Content', {
	id: text().primaryKey(),
	displayName: text(),
	categoryId: int()
		.references(() => Category.id, { onDelete: 'cascade' })
		.notNull(),
	mediaId: int().references(() => Media.id, { onDelete: 'set null' })
});

export const Category = sqliteTable('Category', {
	id: int().primaryKey({ autoIncrement: true }),
	displayName: text()
});
