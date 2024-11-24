<script lang="ts">
	import type { PageData } from './$types';

	import placeholder from '$lib/assets/placeholder-image.png';

	export let data: PageData;
</script>

<section class="mx-auto max-w-screen-xl p-6 py-8 pt-20">
	<h1 class="text-3xl font-extrabold text-blue-950 mb-6">Angezeigte Bilder ändern</h1>

	{#each data.contentCategories as category}
		<div class="mb-8">
			<h2 class="text-2xl font-semibold text-blue-950 mb-4">{category.displayName}</h2>

			<!-- NOTE: Should move the image further to the right -->
			{#each data.content as content}
				{#if content.category === category.id}
					<div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
						<form method="POST" class="flex items-start space-x-6">
							<div class="flex flex-col space-y-4 w-2/3 max-w-md">
								<label for="imageSelection" class="block text-gray-700 font-medium">
									{content.displayName}
									<select
										name="imageSelection"
										id="imageSelection-{content.id}"
										class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
										bind:value={content.media_id}
									>
										{#each data.images as media}
											<option value={media.id} selected={content.media_id === media.id}>
												{media.subtitle}
											</option>
										{/each}
									</select>
								</label>

								<input name="imageId" type="hidden" value={content.id} />

								<button
									type="submit"
									class="w-full py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									Änderungen speichern
								</button>
							</div>

							<div class="ml-6 w-1/3">
								{#if content.media_id}
									<img
										src={`/api/content/image?id=${content.media_id}`}
										alt=""
										class="w-auto h-full max-h-64 rounded-lg shadow-md"
									/>
								{:else}
									<img src={placeholder} alt="" class="w-full h-auto rounded-lg shadow-md" />
								{/if}
							</div>
						</form>
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</section>
