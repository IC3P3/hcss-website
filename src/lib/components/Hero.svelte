<script lang="ts">
	import type { HeroImage } from '$lib/types/Hero';
	import placeholderImg from '$lib/assets/placeholder-image.webp';

	let { img }: { img: HeroImage | null } = $props();

	let bgImg = $derived(img?.path || placeholderImg);
</script>

<section
	id="home"
	class="-mt-16 items-center bg-cover bg-fixed bg-center"
	style="background-image: url({bgImg})"
	aria-label={img?.description}
>
	<div
		class="bg-image flex h-dvh flex-col items-center justify-center bg-[rgba(110,112,116,0.5)] bg-cover bg-center"
	>
		<h1 class="text-center text-4xl font-bold text-white">Helmstedter Chor- und Singschule</h1>
		<p class="mx-5 mt-4 max-w-lg px-4 text-center text-white">
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
			invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
			accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
			sanctus est Lorem ipsum dolor sit amet.
		</p>
		<a
			href="#events"
			class="mt-4 rounded-none bg-blue-700 px-7 py-3 text-xs font-bold text-white uppercase hover:bg-blue-900"
			>Unsere Termine</a
		>
		{#if img?.description}
			<span class="absolute right-3 bottom-2 text-xs text-white/40">
				{img.description}
			</span>
		{/if}
	</div>
</section>
