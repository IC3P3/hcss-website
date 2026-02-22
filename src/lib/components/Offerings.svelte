<script lang="ts">
	import placeholderImg from '$lib/assets/placeholder-image.webp';
	import type { OfferingImage } from '$lib/types/Offering';

	const { offeringImages }: { offeringImages: OfferingImage[] } = $props();

	const offerings = [
		{
			id: 0,
			title: 'Vorgruppe',
			subtitle: 'Kinder ab ca. 5 - 6 Jahren (Musikalische Früherziehung, Singen)',
			times: ['Di. 16:30 - 17:15 Uhr']
		},
		{
			id: 1,
			title: 'Konzertchor',
			subtitle: 'Kinder ab ca. 10 Jahren & Erwachsene',
			times: [
				'Di. 19:00 - 21:00 Uhr Männerstimmen',
				'Do. 17:00 - 19:00 Uhr Knaben-, Mädchen- und Frauenstimmen',
				'Fr. 17:00 - 19:00 Uhr alle Stimmen'
			]
		},
		{
			id: 2,
			title: 'Gesangsunterricht, Musiktheorie und Klavierunterricht',
			subtitle:
				'Für Gesangsunterricht, Musiktheorie und Klavierunterricht passen wir uns gerne an deine Zeitplanung an. Kontaktiere uns einfach und wir finden gemeinsam einen passenden Termin.',
			times: []
		},
		{
			id: 3,
			title: 'Chorprojekte',
			subtitle: 'Für interessierte SängerInnen nach Anmeldung und eigener Vorbereitung.',
			times: [
				'Üblicherweise werden an einem Probenwochenende und einem Konzertwochenende A Capella Werke für Kammerchor oder das große Oratorienrepertoire erarbeitet und aufgeführt.'
			]
		}
	];
</script>

<section id="angebote" class="mx-auto w-full max-w-7xl justify-center p-4 py-6 text-center lg:py-8">
	<h2 class="text-4xl font-extrabold text-blue-950">Unsere Angebote</h2>
	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		{#each offerings as offering (offering.id)}
			<div class="rounded-lg bg-white shadow-lg">
				<img
					class="aspect-3/2 w-full rounded-t-lg object-cover"
					loading="lazy"
					src={offeringImages[offering.id]?.path ?? placeholderImg}
					alt={offering.title}
					onerror={(e: Event) => {
						(e.currentTarget as HTMLImageElement).src = placeholderImg;
					}}
				/>
				<div class="p-6">
					<h3 class="mb-2 text-lg font-bold text-blue-950">{offering.title}</h3>
					<p
						class={offering.times.length > 0
							? 'font-semibold text-gray-700'
							: 'text-gray-700'}
					>
						{offering.subtitle}
					</p>
					{#each offering.times as time, j (j)}
						<p class="text-gray-700">{time}</p>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
