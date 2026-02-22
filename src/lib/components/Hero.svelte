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
	<div class="relative flex h-dvh flex-col items-center justify-center bg-cover bg-center">
		<div class="mt-44 flex flex-col items-center">
			<h1 class="text-center text-6xl font-bold text-white text-shadow-lg">
				Helmstedter Chor- und Singschule
			</h1>
			<p class="mx-5 mt-4 max-w-lg px-2 text-center text-xl text-white text-shadow-lg">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
				tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
			</p>
			<a
				href="#veranstaltungen"
				class="mt-4 rounded-md bg-hcss-primary-700 px-7 py-3 text-xs font-bold text-white uppercase hover:bg-hcss-primary-900"
				>Unsere Termine</a
			>
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
