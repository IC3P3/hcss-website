import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { Media } from './models/Media';
import { Event } from './models/Event';
import { Content, Category } from './models/Content';
import { DATABASE_URL } from '$env/static/private';

if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = createClient({ url: DATABASE_URL });

export const db = drizzle(client, {
	schema: {
		Media,
		Event,
		Content,
		Category
	}
});
