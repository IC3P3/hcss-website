<script lang="ts">
	import type { HeroImage } from '$lib/types/Hero';
	import placeholderImg from '$lib/assets/placeholder-image.webp';
	import SocialMedia from '$lib/components/SocialMedia.svelte';

	const { img }: { img: HeroImage | null } = $props();

	const bgImg = $derived(img?.path || placeholderImg);
</script>

<section
	id="home"
	class="items-center bg-cover bg-fixed bg-center"
	style="background-image: url({bgImg})"
	aria-label={img?.description || 'Platzhalter'}
>
	<div class="relative flex h-dvh flex-col items-center bg-black/40 bg-cover bg-center pt-16">
		<div class="flex flex-col items-center pt-navbar">
			<h1 class="text-center text-6xl font-bold text-white text-shadow-lg">
				Helmstedter Chor- und Singschule
			</h1>
			<p
				class="mx-5 mt-4 max-w-4xl px-2 text-center text-xl text-white font-semibold text-shadow-lg"
			>
				Na, hallo, da will jemand mehr über die Helmstedter Chor- und Singschule erfahren.
				Das freunt uns. Herzlich willkommen. Hier ist lernst du den Konzertchor Helmstedter
				Chor- und Singschule kennen. Wenn du uns schon kennst aber Kontakt aufnehmen willst,
				schreib uns gern eine <a href="mailto:HCSS38350@gmx.de" class="underline">Mail</a> oder
				komm einfach mal vorbei. Du erreichst uns am besten zur Gesamtprobe am Freitag von 17
				bis 20 Uhr im Gemeindehaus St. Marienberg Helmstedt. Alle anderen Zeiten findest du in
				unserem Angebot.
			</p>
			<div class="flex felx-col mt-64">
				<a
					href="mailto:HCSS38350@gmx.de"
					class="mt-4 rounded-md bg-hcss-primary-700 px-7 py-3 mx-4 text-xs font-bold text-white uppercase transition-colors duration-200 hover:bg-hcss-primary-900"
					>Unsere E-Mail</a
				>
				<a
					href="#veranstaltungen"
					class="mt-4 rounded-md bg-hcss-primary-700 px-7 py-3 mx-4 text-xs font-bold text-white uppercase transition-colors duration-200 hover:bg-hcss-primary-900"
					>Unsere Termine</a
				>
			</div>
		</div>
		<div
			class="absolute bottom-4 left-4 rounded-full bg-black/30 px-4 py-2 opacity-60 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100"
		>
			<SocialMedia />
		</div>
		{#if img?.description}
			<span
				class="absolute right-3 bottom-4 rounded-full bg-black/30 px-3 py-1 text-xs text-white/40 backdrop-blur-sm"
				>{img?.description}</span
			>
		{/if}
	</div>
</section>
