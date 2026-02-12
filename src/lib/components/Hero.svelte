<script lang="ts">
	import type { HeroImage } from '$lib/types/Hero';
	import placeholderImg from '$lib/assets/placeholder-image.webp';
	import SocialMedia from '$lib/components/SocialMedia.svelte';

	let { img }: { img: HeroImage | null } = $props();

	let bgImg = $derived(img?.path || placeholderImg);
</script>

<section
	id="home"
	class="items-center bg-cover bg-fixed bg-center"
	style="background-image: url({bgImg})"
	aria-label={img?.description || 'Platzhalter'}
>
	<div
		class="bg-image relative flex h-dvh flex-col items-center justify-center bg-[rgba(110,112,116,0.5)] bg-cover bg-center"
	>
		<h1 class="text-center text-4xl font-bold text-white text-shadow-lg">
			Helmstedter Chor- und Singschule
		</h1>
		<p class="mx-5 mt-4 max-w-lg px-4 text-center text-white text-shadow-lg">
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
			invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
			accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
			sanctus est Lorem ipsum dolor sit amet.
		</p>
		<a
			href="#veranstaltungen"
			class="mt-4 rounded-md bg-blue-700 px-7 py-3 text-xs font-bold text-white uppercase hover:bg-blue-900"
			>Unsere Termine</a
		>
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
