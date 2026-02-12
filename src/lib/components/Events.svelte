<script lang="ts">
	import type { Event } from '$lib/types/Event';
	import SocialMedia from '$lib/components/SocialMedia.svelte';

	const { events }: { events: Event[] } = $props();
</script>

<section
	id="veranstaltungen"
	aria-labelledby="events-heading"
	class="mx-auto w-full max-w-7xl justify-center p-4 py-6 text-center lg:py-8"
>
	<h2 id="events-heading" class="mb-8 text-4xl font-extrabold text-blue-950">Konzerte</h2>

	{#if events.length !== 0}
		<ul aria-label="Liste der Konzerte" class="list-none p-0">
			{#each events as event (event.id)}
				{@const date = new Date(event.time)}
				<li>
					<article class="my-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
						<div class="gap-4 lg:grid lg:grid-cols-4 lg:gap-8">
							<div class="mt-1 lg:flex lg:flex-col lg:justify-center">
								<time
									datetime={date.toISOString()}
									class="block text-left text-xl font-semibold text-blue-950"
								>
									{date.toLocaleDateString('de', {
										day: '2-digit',
										month: 'long',
										year: 'numeric'
									})}
								</time>
								<p class="text-left text-lg text-gray-600">
									{date.toLocaleTimeString('de', {
										hour: '2-digit',
										minute: '2-digit'
									})} Uhr
								</p>
							</div>

							<div class="mt-4 lg:col-span-2 lg:mt-0 lg:text-center">
								<h3 class="mb-2 text-2xl font-bold text-blue-950">{event.title}</h3>
								{#if event.shortDescription}
									<p class="text-lg text-gray-700">{event.shortDescription}</p>
								{/if}
							</div>

							<address
								class="mt-4 not-italic lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:text-right"
							>
								{#each event.address.split(', ') as part, index (index)}
									<p class="text-lg text-gray-700">{part}</p>
								{/each}
							</address>
						</div>
					</article>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="my-4 rounded-lg border border-gray-200 bg-white p-10 shadow-md">
			<p class="text-xl text-gray-700">Momentan sind keine Konzerte geplant.</p>
			<p class="mt-2 text-lg text-gray-500">
				Folgt uns auf Social Media, um keine Neuigkeiten zu verpassen!
			</p>
			<div class="mt-6 flex justify-center">
				<SocialMedia color="text-blue-950" hoverColor="hover:text-blue-700" />
			</div>
		</div>
	{/if}
</section>
