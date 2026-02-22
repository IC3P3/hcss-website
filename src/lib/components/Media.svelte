<script lang="ts">
	import placeholderImg from '$lib/assets/placeholder-image.webp';
	import type { Media } from '$lib/types/Media';

	const { media }: { media: Media[] } = $props();

	const FULL_SIZE = 6;
	const placeholders: Media[] = $derived(
		Array.from({ length: Math.max(0, FULL_SIZE - media.length) }, (_, i) => ({
			id: -(i + 1),
			title: null,
			description: null,
			path: null
		}))
	);

	const items = $derived([...media, ...placeholders]);

	let hoveredId = $state<number | null>(null);
</script>

<section
	id="impressionen"
	class="mx-auto w-screen max-w-7xl justify-center p-4 py-6 text-center lg:py-8"
>
	<h2 class="text-4xl font-extrabold text-blue-950">Medien</h2>
	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
		{#each items as item (item.id)}
			<div
				class="relative overflow-hidden focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
				tabindex="0"
				role="button"
				onmouseenter={() => (hoveredId = item.id)}
				onmouseleave={() => (hoveredId = null)}
				onfocus={() => (hoveredId = item.id)}
				onblur={() => (hoveredId = null)}
			>
				<img
					class="aspect-4/3 w-full object-cover"
					loading="lazy"
					src={item.path ?? placeholderImg}
					alt={item.description ?? 'Bild der HCSS'}
					onerror={(e: Event) => {
						(e.currentTarget as HTMLImageElement).src = placeholderImg;
					}}
				/>
				<div
					class="pointer-events-none absolute inset-0 flex items-end bg-blue-700/75 p-8 opacity-100 transition-opacity duration-300"
					class:sm:opacity-0={hoveredId !== item.id}
					class:sm:opacity-100={hoveredId === item.id}
				>
					<div class="flex w-full flex-col items-start">
						<h3 class="mb-2 w-full text-center text-2xl font-semibold text-white">
							{item.title ?? 'Bild der HCSS'}
						</h3>
						{#if item.description}
							<span class="text-start text-sm text-white">{item.description}</span>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
