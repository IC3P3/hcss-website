<script lang="ts">
	import Facebook from '$lib/assets/Facebook.svelte';
	import Instagram from '$lib/assets/Instagram.svelte';
	import Soundcloud from '$lib/assets/Soundcloud.svelte';

	interface Props {
		media: string[];
	}

	let { media }: Props = $props();
</script>

<section
	id="media"
	class="max-w-screen-xl mx-auto w-screen p-4 py-6 lg:py-8 text-center justify-center"
>
	<h2 class="text-blue-950 font-extrabold text-4xl">Medien</h2>
	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
	<div class="flex flex-wrap justify-between">
		{#each media as item}
			<div class="relative overflow-hidden w-full sm:w-1/2 lg:w-1/3 group">
				<img class="w-full h-64 object-cover" src="/api/content/image?id={item.id}" alt="" />
				<div
					class="absolute inset-0 flex items-end bg-blue-700 bg-opacity-75 p-8 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-300"
				>
					<div class="flex flex-col items-start w-full">
						<h3 class="text-white text-2xl font-semibold mb-2">Placeholder</h3>
						<span class="text-white text-sm">{item.subtitle}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-8 flex flex-col items-center justify-center gap-6">
		<p class="justify-center text-center text-blue-950 font-bold text-xl mx-auto max-w-screen-xl">
			Entdecke mehr Inhalte auf unseren sozialen Netzwerken!
		</p>

		<div class="flex gap-6">
			<a
				href="https://facebook.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-950 hover:text-blue-600"
			>
				<Facebook style="h-8" />
			</a>

			<a
				href="https://instagram.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-950 hover:text-blue-600"
			>
				<Instagram style="h-8" />
			</a>

			<a
				href="https://soundcloud.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-950 hover:text-blue-600"
			>
				<Soundcloud style="h-8" />
			</a>
		</div>
	</div>
</section>
