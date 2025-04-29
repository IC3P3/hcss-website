<script lang="ts">
	let { events } = $props();
</script>

<section
	id="events"
	class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 text-center justify-center"
>
	<h2 class="text-blue-950 font-extrabold text-4xl mb-8">Termine</h2>

	{#each events as event}
		<div class="my-8 p-6 bg-white shadow-md rounded-lg border border-gray-200">
			<div class="lg:grid lg:grid-cols-4 gap-8">
				<div class="align-middle mt-1">
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
					<h3 class="text-2xl font-bold text-blue-950 mb-2">{event.title}</h3>
					<p class="text-gray-700 text-lg">{event.subtitle}</p>
				</div>

				<div class="lg:text-left align-middle">
					{#each event.address.split(', ') as part}
						<p class="text-right text-lg text-gray-700 align-right">{part}</p>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</section>
