import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq, sql } from 'drizzle-orm';
import { env } from 'process';
import { PageContent, Subpage } from '../src/lib/server/models/PageContent';
import { User } from '../src/lib/server/models/User';
import { hash } from 'argon2';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const ADMIN_USERNAME = env.ADMIN_USERNAME ?? 'admin';
const ADMIN_PASSWORD = env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
	throw new Error('ADMIN_PASSWORD is required for the production seed');
}

const client = new Database(env.DATABASE_URL);

const db = drizzle(client, {
	schema: {
		PageContent,
		Subpage,
		User
	}
});

function rowCount(table: typeof User | typeof Subpage) {
	const [{ value }] = db
		.select({ value: sql<number>`count(*)` })
		.from(table)
		.all();
	return value;
}

async function main(adminPassword: string) {
	console.log('Seeding database (production)...');

	const existingAdmin = db
		.select({ id: User.id })
		.from(User)
		.where(eq(User.username, ADMIN_USERNAME))
		.get();

	if (existingAdmin) {
		console.log(`Admin user "${ADMIN_USERNAME}" already exists, skipping.`);
	} else {
		db.insert(User)
			.values({
				username: ADMIN_USERNAME,
				passwordHash: await hash(adminPassword)
			})
			.run();
		console.log(`Created admin user "${ADMIN_USERNAME}".`);
	}

	if (rowCount(Subpage) > 0) {
		console.log('Subpages already present, skipping structural content.');
	} else {
		db.insert(Subpage)
			.values([
				{
					title: 'Startseite',
					description: 'Die erste Seite auf welcher man beim öffnen der Website landet.'
				},
				{
					title: 'Veranstaltungen',
					description:
						'Eine Übersicht an allen vergangenen und zukünftigen Veranstaltungen.'
				},
				{
					title: 'Media',
					description: 'Eine Übersicht an allen hochgeladenen Medien.'
				}
			])
			.run();

		db.insert(PageContent)
			.values([
				{
					tag: 'hero',
					title: 'Hero Image',
					description: 'Das Bild, welches man als erstes auf der Startseite sieht.',
					subpageId: 1
				},
				{
					tag: 'media',
					title: 'Media Bild 1',
					description: 'Bild 1 aus der Medien Übersicht.',
					subpageId: 1
				},
				{
					tag: 'media',
					title: 'Media Bild 2',
					description: 'Bild 2 aus der Medien Übersicht.',
					subpageId: 1
				},
				{
					tag: 'media',
					title: 'Media Bild 3',
					description: 'Bild 3 aus der Medien Übersicht.',
					subpageId: 1
				},
				{
					tag: 'media',
					title: 'Media Bild 4',
					description: 'Bild 4 aus der Medien Übersicht.',
					subpageId: 1
				},
				{
					tag: 'media',
					title: 'Media Bild 5',
					description: 'Bild 5 aus der Medien Übersicht.',
					subpageId: 1
				},
				{
					tag: 'media',
					title: 'Media Bild 6',
					description: 'Bild 6 aus der Medien Übersicht.',
					subpageId: 1
				},
				{
					tag: 'offer-1',
					title: 'Bild der Vorgruppen',
					description: 'Darstellung der Vorgruppe im Angebot unserer Einrichtung',
					subpageId: 1
				},
				{
					tag: 'offer-2',
					title: 'Bild des Konzertchor',
					description: 'Darstellung des Konzertchors im Angebot unserer Einrichtung',
					subpageId: 1
				},
				{
					tag: 'offer-3',
					title: 'Unterrichtsbild',
					description: 'Darstellung des Konzertchors im Angebot unserer Einrichtung',
					subpageId: 1
				},
				{
					tag: 'offer-4',
					title: 'Bild des Projektchors',
					description: 'Darstellung des Projektchors im Angebot unserer Einrichtung',
					subpageId: 1
				}
			])
			.run();
		console.log('Created structural subpages and page content.');
	}

	console.log('Seeding complete!');
	client.close();
}

main(ADMIN_PASSWORD).catch((err) => {
	console.error('Seeding failed:', err);
	client.close();
	process.exit(1);
});
