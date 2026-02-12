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

async function main() {
	console.log('Seeding database...');

	db.delete(PageContent).run();
	db.delete(Session).run();
	db.delete(Media).run();
	db.delete(Subpage).run();
	db.delete(Event).run();
	db.delete(User).run();

	db.insert(User)
		.values({
			username: 'admin',
			passwordHash: await hashPassword('123456aA!')
		})
		.run();

	db.insert(Event)
		.values([
			{
				title: 'Sommerkonzert',
				shortDescription: 'Unser jährliches Sommerkonzert im Park.',
				description:
					'Genießen Sie einen musikalischen Abend unter freiem Himmel mit unserem Orchester. Eintritt frei!',
				time: Math.floor(new Date('2026-07-15T19:00:00').getTime() / 1000),
				address: 'Stadtpark, Hauptstraße 1',
				songs: 'Beethoven - Sinfonie Nr. 5, Mozart - Eine kleine Nachtmusik',
				participants: 'HCSS Orchester, Gastchor Harmonie'
			},
			{
				title: 'Weihnachtskonzert',
				shortDescription: 'Festliche Klänge zur Weihnachtszeit.',
				description:
					'Lassen Sie sich von weihnachtlichen Melodien verzaubern. Konzert in der Stadtkirche.',
				time: Math.floor(new Date('2026-12-20T18:00:00').getTime() / 1000),
				address: 'Stadtkirche, Kirchplatz 3',
				songs: 'Stille Nacht, O Tannenbaum, Weihnachtsoratorium',
				participants: 'HCSS Chor, HCSS Orchester'
			},
			{
				title: 'Frühlingsmatinee',
				shortDescription: 'Musikalischer Sonntagmorgen im Frühling.',
				description:
					'Ein entspannter Sonntagmorgen mit Kammermusik und Kaffee im Gemeindehaus.',
				time: Math.floor(new Date('2026-04-19T11:00:00').getTime() / 1000),
				address: 'Gemeindehaus, Lindenweg 5',
				songs: 'Vivaldi - Frühling, Schubert - Forellen-Quintett',
				participants: 'HCSS Kammerensemble'
			}
		])
		.run();

	db.insert(Subpage)
		.values([
			{
				title: 'Über uns',
				description: 'Informationen über unseren Verein und unsere Geschichte.'
			},
			{
				title: 'Ensembles',
				description: 'Unsere verschiedenen musikalischen Ensembles im Überblick.'
			},
			{
				title: 'Kontakt',
				description: 'So erreichen Sie uns.'
			}
		])
		.run();

	db.insert(PageContent)
		.values([
			{
				title: 'Willkommen beim HCSS',
				description:
					'Der HCSS ist ein traditionsreicher Musikverein mit einer langen Geschichte. Seit über 50 Jahren begeistern wir unser Publikum mit Konzerten und Aufführungen.',
				subpageId: 1
			},
			{
				title: 'Unser Orchester',
				description:
					'Das HCSS Orchester besteht aus über 40 engagierten Musikerinnen und Musikern, die regelmäßig proben und auftreten.',
				subpageId: 2
			},
			{
				title: 'Der Chor',
				description:
					'Unser gemischter Chor umfasst rund 30 Sängerinnen und Sänger. Neue Mitglieder sind jederzeit willkommen!',
				subpageId: 2
			},
			{
				title: 'Kontaktinformationen',
				description:
					'Schreiben Sie uns eine E-Mail an info@hcss-musik.de oder besuchen Sie uns bei einer unserer Proben.',
				subpageId: 3
			}
		])
		.run();

	db.insert(Media)
		.values([
			{
				title: 'Sommerkonzert 2025 - Gruppenfoto',
				description: 'Gruppenfoto des Orchesters nach dem Sommerkonzert 2025.',
				slug: 'sommerkonzert-2025-gruppenfoto',
				path: '/uploads/sommerkonzert-2025.webp',
				role: 0,
				eventId: 1
			},
			{
				title: 'Probenwochenende',
				description: 'Impressionen vom Probenwochenende in der Jugendherberge.',
				slug: 'probenwochenende',
				path: '/uploads/probenwochenende.webp',
				role: 0,
				eventId: null
			},
			{
				title: 'Weihnachtskonzert Plakat',
				description: 'Plakat für das Weihnachtskonzert 2026.',
				slug: 'weihnachtskonzert-plakat-2026',
				path: '/uploads/weihnachtskonzert-plakat.webp',
				role: 0,
				eventId: 2
			}
		])
		.run();

	console.log('Seeding complete!');
	client.close();
}

main().catch((err) => {
	console.error('Seeding failed:', err);
	client.close();
	process.exit(1);
});
