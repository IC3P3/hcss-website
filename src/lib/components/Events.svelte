<script lang="ts">
	let { events } = $props();
</script>

<section
	id="events"
	class="mx-auto w-full max-w-screen-xl justify-center p-4 py-6 text-center lg:py-8"
>
	<h2 class="mb-8 text-4xl font-extrabold text-blue-950">Termine</h2>

	{#each events as event (event.title)}
		<div class="my-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
			<div class="gap-8 lg:grid lg:grid-cols-4">
				<div class="mt-1 align-middle">
					<p class="text-left text-xl font-semibold text-blue-950">
						{new Date(event.time).toLocaleDateString('de', {
							day: '2-digit',
							month: 'long',
							year: 'numeric'
						})}
					</p>
					<p class="text-left text-lg text-gray-600">
						{new Date(event.time).toLocaleTimeString('de', { hour: '2-digit', minute: '2-digit' })} Uhr
					</p>
				</div>

				<div class="lg:col-span-2 lg:text-center">
					<h3 class="mb-2 text-2xl font-bold text-blue-950">{event.title}</h3>
					<p class="text-lg text-gray-700">{event.subtitle}</p>
				</div>

				<div class="align-middle lg:text-left">
					{#each event.address.split(', ') as part (part.title)}
						<p class="align-right text-right text-lg text-gray-700">{part}</p>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</section>
