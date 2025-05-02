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
	class="mx-auto w-screen max-w-screen-xl justify-center p-4 py-6 text-center lg:py-8"
>
	<h2 class="text-4xl font-extrabold text-blue-950">Medien</h2>
	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
	<div class="flex flex-wrap justify-between">
		{#each media as item}
			<div class="group relative w-full overflow-hidden sm:w-1/2 lg:w-1/3">
				<img class="h-64 w-full object-cover" src="/api/content/image?id={item.id}" alt="" />
				<div
					class="bg-opacity-75 absolute inset-0 flex items-end bg-blue-700 p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:opacity-100"
				>
					<div class="flex w-full flex-col items-start">
						<h3 class="mb-2 text-2xl font-semibold text-white">Placeholder</h3>
						<span class="text-sm text-white">{item.subtitle}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-8 flex flex-col items-center justify-center gap-6">
		<p class="mx-auto max-w-screen-xl justify-center text-center text-xl font-bold text-blue-950">
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
