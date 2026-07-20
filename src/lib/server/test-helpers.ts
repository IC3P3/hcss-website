import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './db';

export function migrateTestDb() {
	migrate(db, { migrationsFolder: './drizzle' });
}

export function formRequest(fields: Record<string, string>): Request {
	const body = new FormData();
	for (const [key, value] of Object.entries(fields)) {
		body.append(key, value);
	}
	return new Request('http://localhost/', { method: 'POST', body });
}
