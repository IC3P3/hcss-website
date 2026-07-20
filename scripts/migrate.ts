// Applies pending migrations with drizzle-orm's migrator (a prod dep), so it
// runs in the container without drizzle-kit. Safe on every boot.

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { env } from 'node:process';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = new Database(env.DATABASE_URL);
const db = drizzle(client);

try {
	migrate(db, { migrationsFolder: env.MIGRATIONS_FOLDER ?? './drizzle' });
	console.log('Migrations applied.');
} catch (err) {
	console.error('Migration failed:', err);
	client.close();
	process.exit(1);
}

client.close();
