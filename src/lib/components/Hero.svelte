<script lang="ts">
	import type { HeroImage } from '$lib/types/Hero';
	import placeholderImg from '$lib/assets/placeholder-image.webp';
	import SocialMedia from '$lib/components/SocialMedia.svelte';

	const { img }: { img: HeroImage | null } = $props();

	const bgImg = $derived(img?.path || placeholderImg);
</script>

<section
	id="home"
	class="items-center bg-cover bg-center md:bg-fixed"
	style="background-image: url({bgImg})"
	aria-label={img?.description || 'Platzhalter'}
>
	<div
		class="relative flex h-dvh flex-col items-center justify-start bg-linear-to-b from-black/70 via-black/40 to-transparent bg-cover bg-center pt-navbar"
	>
		<div class="flex flex-col items-center px-4 pt-navbar">
			<h1
				class="text-center text-4xl font-bold text-white text-shadow-lg sm:text-5xl md:text-6xl"
			>
				Helmstedter Chor- und Singschule
			</h1>
			<p
				class="mx-5 mt-4 max-w-4xl px-2 text-center text-base text-white font-semibold text-shadow-lg sm:text-xl"
			>
				Willkommen. Hier ist lernst du den Konzertchor Helmstedt und die Angebote der
				Helmstedter Chor- und Singschule kennen. Wenn du uns schon kennst aber Kontakt
				aufnehmen willst, schreib uns gern eine <a
					href="mailto:HCSS38350@gmx.de"
					class="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-0"
					>Mail</a
				>
				oder komm einfach mal vorbei. Du erreichst uns am besten zur Gesamtprobe am Freitag von
				17 bis 20 Uhr im Gemeindehaus St. Marienberg Helmstedt. Alle anderen Zeiten findest du
				in unserem Angebot.
			</p>
			<div class="mt-16 flex flex-col items-center sm:mt-64 sm:flex-row">
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
