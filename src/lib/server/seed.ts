/* eslint-disable no-magic-numbers */

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
				time: Math.floor(new Date('2026-07-15T19:00:00').getTime()),
				address: 'Stadtpark, Hauptstraße 1',
				songs: 'Beethoven - Sinfonie Nr. 5, Mozart - Eine kleine Nachtmusik',
				participants: 'HCSS Orchester, Gastchor Harmonie'
			},
			{
				title: 'Weihnachtskonzert',
				shortDescription: 'Festliche Klänge zur Weihnachtszeit.',
				description:
					'Lassen Sie sich von weihnachtlichen Melodien verzaubern. Konzert in der Stadtkirche.',
				time: Math.floor(new Date('2026-12-20T18:00:00').getTime()),
				address: 'Stadtkirche, Kirchplatz 3',
				songs: 'Stille Nacht, O Tannenbaum, Weihnachtsoratorium',
				participants: 'HCSS Chor, HCSS Orchester'
			},
			{
				title: 'Frühlingsmatinee',
				shortDescription: 'Musikalischer Sonntagmorgen im Frühling.',
				description:
					'Ein entspannter Sonntagmorgen mit Kammermusik und Kaffee im Gemeindehaus.',
				time: Math.floor(new Date('2026-04-19T11:00:00').getTime()),
				address: 'Gemeindehaus, Lindenweg 5',
				songs: 'Vivaldi - Frühling, Schubert - Forellen-Quintett',
				participants: 'HCSS Kammerensemble'
			}
		])
		.run();

	db.insert(Subpage)
		.values([
			{
				title: 'Startseite',
				description: 'Die erste Seite auf welcher man beim öffnen der Website landet.'
			},
			{
				title: 'Veranstaltungen',
				description: 'Eine Übersicht an allen vergangenen und zukünftigen Veranstaltungen.'
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

	db.insert(Media)
		.values([
			{
				title: 'Sommerkonzert 2025 - Gruppenfoto',
				description: 'Gruppenfoto des Orchesters nach dem Sommerkonzert 2025.',
				slug: 'sommerkonzert-2025-gruppenfoto',
				path: 'sommerkonzert-2025.jpg',
				role: 0,
				eventId: 1
			},
			{
				title: 'Probenwochenende',
				description: 'Impressionen vom Probenwochenende in der Jugendherberge.',
				slug: 'probenwochenende',
				path: 'probenwochenende.webp',
				role: 0,
				eventId: null
			},
			{
				title: 'Weihnachtskonzert Plakat',
				description: 'Plakat für das Weihnachtskonzert 2026.',
				slug: 'weihnachtskonzert-plakat-2026',
				path: 'weihnachtskonzert-plakat.webp',
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
