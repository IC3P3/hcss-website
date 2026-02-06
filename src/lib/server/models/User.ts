import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const Session = sqliteTable('Session', {
	id: int().primaryKey({ autoIncrement: true }),
	sessionKey: text().notNull(),
	lastSeen: int().notNull(),
	userId: int()
		.references(() => User.id, { onDelete: 'cascade' })
		.notNull()
});

export const User = sqliteTable('User', {
	id: int().primaryKey({ autoIncrement: true }),
	username: text().notNull(),
	passwordHash: text().notNull()
});
