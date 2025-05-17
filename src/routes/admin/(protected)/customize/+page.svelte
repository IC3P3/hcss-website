<script lang="ts">
	import { enhance } from '$app/forms';
	import placeholder from '$lib/assets/placeholder-image.png';

	interface Props {
		data: {
			media: {
				id: number;
				subtitle: string;
			}[];
			content: {
				id: string;
				displayName: string;
				category_id: number;
				media_id: number;
			}[];
			contentCategories: {
				id: number;
				displayName: string;
			}[];
		};
	}

	const { data }: Props = $props();
</script>

<section class="mx-auto max-w-screen-xl p-6 py-8 pt-20">
	<h1 class="mb-6 text-3xl font-extrabold text-blue-950">Angezeigte Bilder ändern</h1>

	{#each data.contentCategories as category (category.id)}
		<div class="mb-8">
			<h2 class="mb-4 text-2xl font-semibold text-blue-950">{category.displayName}</h2>

			<!-- NOTE: Should move the image further to the right -->
			{#each data.content as content (content.id)}
				{#if content.category_id === category.id}
					<div class="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
						<form method="POST" class="flex items-start space-x-6" use:enhance>
							<div class="flex w-2/3 max-w-md flex-col space-y-4">
								<label for="imageSelection" class="block font-medium text-gray-700">
									{content.displayName}
									<select
										name="imageSelection"
										id="imageSelection-{content.id}"
										class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
										bind:value={content.media_id}
									>
										{#each data.media as media (media.id)}
											<option value={media.id} selected={content.media_id === media.id}>
												{media.subtitle}
											</option>
										{/each}
									</select>
								</label>

								<input name="imageId" type="hidden" value={content.id} />

								<button
									type="submit"
									class="w-full rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								>
									Änderungen speichern
								</button>
							</div>

							<div class="ml-6 w-1/3">
								{#if content.media_id}
									<img
										src={`/api/image?id=${content.media_id}`}
										alt=""
										class="h-full max-h-64 w-auto rounded-lg shadow-md"
									/>
								{:else}
									<img src={placeholder} alt="" class="h-auto w-full rounded-lg shadow-md" />
								{/if}
							</div>
						</form>
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</section>
