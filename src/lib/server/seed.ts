import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { env } from 'process';
import { Media } from './models/Media';
import { Event } from './models/Event';
import { PageContent, Subpage } from './models/PageContent';
import { Session, User } from './models/User';
import { hash } from 'argon2';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = new Database(env.DATABASE_URL);

const db = drizzle(client, {
	schema: {
		Media,
		Event,
		PageContent,
		Subpage,
		Session,
		User
	}
});

async function hashPassword(password: string) {
	const passwordHash = await hash(password);
	return passwordHash;
}

db.delete(Media).run();
db.delete(Event).run();
db.delete(PageContent).run();
db.delete(Subpage).run();
db.delete(Session).run();
db.delete(User).run();

db.insert(User)
	.values({
		username: 'admin',
		passwordHash: await hashPassword('123456aA!')
	})
	.run();
