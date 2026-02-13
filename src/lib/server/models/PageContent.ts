import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Media } from './Media';

export const PageContent = sqliteTable('PageContent', {
	id: int().primaryKey({ autoIncrement: true }),
	tag: text().notNull(),
	title: text(),
	description: text(),
	subpageId: int()
		.references(() => Subpage.id, { onDelete: 'cascade' })
		.notNull(),
	mediaId: int().references(() => Media.id, { onDelete: 'set null' })
});

export const Subpage = sqliteTable('Subpage', {
	id: int().primaryKey({ autoIncrement: true }),
	title: text(),
	description: text()
});
