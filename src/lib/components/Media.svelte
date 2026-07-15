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
	class="mx-auto w-full max-w-7xl justify-center p-4 py-6 text-center lg:py-8"
>
	<h2 class="text-4xl font-extrabold text-hcss-primary-950">Impressionen</h2>
	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
	<div
		class="grid grid-cols-1 overflow-hidden rounded-lg shadow-lg sm:grid-cols-2 lg:grid-cols-3"
	>
		{#each items as item (item.id)}
			<div
				class="relative overflow-hidden focus-within:outline-2 focus-within:outline-hcss-primary-500"
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
					class="pointer-events-none absolute inset-0 hidden items-end bg-hcss-primary-700/75 p-8 opacity-0 transition-opacity duration-300 sm:flex"
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

				{#if item.title || item.description}
					<div
						class="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start bg-linear-to-t from-black/75 via-black/40 to-transparent p-4 sm:hidden"
					>
						<h3 class="w-full text-center text-lg font-semibold text-white">
							{item.title ?? 'Bild der HCSS'}
						</h3>
						{#if item.description}
							<span class="mt-1 text-start text-sm text-white/90"
								>{item.description}</span
							>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
