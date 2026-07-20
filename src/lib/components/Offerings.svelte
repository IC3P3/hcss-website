<script lang="ts">
	import placeholderImg from '$lib/assets/placeholder-image.webp';
	import type { OfferingImage } from '$lib/types/Offering';

	const { offeringImages }: { offeringImages: OfferingImage[] } = $props();

	const offerings = [
		{
			id: 0,
			title: 'Vorgruppe 1, Kinder ab etwa 5 Jahren',
			subtitle: 'Musikalische Früherziehung und Gesang',
			times: ['Dienstag von 16:30 bis 17:15 Uhr']
		},
		{
			id: 1,
			title: 'Vorgruppe 2, Kinder ab etwa 8 Jahren',
			subtitle: 'Kindgerechter Gesangsunterricht und Musiktheorie in der Gruppe',
			times: ['Mittwoch von 16:00 bis 16:45 Uhr']
		},
		{
			id: 2,
			title: 'Konzertchor',
			subtitle: 'Kinder ab 10 Jahren und Erwachsene',
			times: [
				'Dienstag 19:00 bis 21:00 Uhr, Männerstimmen (Tenor/Bass)',
				'Donnerstag 17:00 bis 19:00 Uhr, Knaben-, Mädchen- und Frauenstimmen (Sopran/Alt)',
				'Freitag 17:00 Uhr bis 20:00 Uhr, Gesamtprobe'
			]
		},
		{
			id: 3,
			title: 'Gesangsunterricht, Musiktheorie und Klavierunterricht',
			subtitle:
				'Es muss nicht zwingend der Chor sein, aber Musik ist schon eine tolle Sache. Darum bietet die Chor- und Singschule Helmstedt freien Gesangs- und Klavierunterricht sowie Musiktheorie an. Die Termine dafür kannst du persönlich mit Stefan PD Runge absprechen. Und wenn du dann doch Lust hast, ist der Weg zum Chor sozusagen nur ein Schritt.',
			times: ['Termine nach Absprache']
		},
		{
			id: 4,
			title: 'Chorprojekte',
			subtitle:
				'Mancher möchte sich nicht dauerhaft an einen Chor binden, hat aber trotzdem Lust auf gemeinschaftlichen Gesang. Dann ist der Projektchor genau die richtige Wahl. Am besten, du schaust einfach immer mal wieder vorbei, um zu erfahren, ob ein besonderes Gesangsprojekt, etwa ein Requiem oder eines der vielen wunderbaren weiteren Werke geplant sind. Wenn du möchtest, dass wir dich vormerken, schreib uns gern eine Mail. Wichtig wären ein paar Worte über deinen gesanglichen Status. Aber keine Sorge: Für den Projektchor musst du kein Profi sein, sondern einfach nur Spaß haben.',
			times: []
		},
		{
			id: 5,
			title: 'Vocalcoaching',
			subtitle:
				'Auch damit kann die Chor- und Singschule Helmstedt dienen. Stefan PD Runge festigt gern deinen sicheren Stand, deine Ausdrucksstärke, den richtigen Sitz des Atems, die perfekte Formung deiner Sprache und so weiter. Auch Songwritern kann Stefan PD Runge helfen. Kurz: Meldet euch gern. Natürlich müsst ihr dafür kein Mitglied im Chor sein. Ihr dürft aber selbstverständlich. Termine für eure Einheiten macht ihr direkt ab.',
			times: []
		}
	];
</script>

<section
	id="angebote"
	class="w-full bg-linear-to-b from-white from-[10rem] via-hcss-primary-100 via-[22rem] to-white"
>
	<div class="mx-auto w-full max-w-7xl p-4 py-6 text-center lg:py-8">
		<h2 class="text-4xl font-extrabold text-hcss-primary-950">Unsere Angebote</h2>
		<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
		<div class="grid grid-cols-2 gap-8 md:grid-cols-3">
			{#each offerings as offering (offering.id)}
				<div class="rounded-lg bg-white shadow-lg">
					<img
						class="aspect-video w-full rounded-t-lg object-cover"
						loading="lazy"
						src={offeringImages[offering.id]?.path ?? placeholderImg}
						alt={offering.title}
						onerror={(e: Event) => {
							(e.currentTarget as HTMLImageElement).src = placeholderImg;
						}}
					/>
					<div class="p-6">
						<h3 class="mb-2 text-lg font-bold text-hcss-primary-950">
							{offering.title}
						</h3>
						<p
							class={offering.times.length > 0
								? 'font-semibold text-gray-700 text-left'
								: 'text-gray-700 text-left'}
						>
							{offering.subtitle}
						</p>
						{#each offering.times as time, j (j)}
							<p class="text-gray-700 my-2 text-left">{time}</p>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
