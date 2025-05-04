import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const Session = sqliteTable('Session', {
	id: int().primaryKey({ autoIncrement: true }),
	user_id: int()
		.references(() => User.id, { onDelete: 'cascade' })
		.notNull(),
	session_key: text().notNull(),
	last_seen: int().notNull()
});

export const User = sqliteTable('User', {
	id: int().primaryKey({ autoIncrement: true }),
	username: text().notNull(),
	password_hash: text().notNull()
});
