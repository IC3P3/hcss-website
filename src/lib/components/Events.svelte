<script lang="ts">
	export let events;
</script>

<section
	id="events"
	class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 text-center justify-center"
>
	<h2 class="text-blue-950 font-extrabold text-4xl">Termine</h2>

	{#each events as event}
		<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
		<div class="lg:grid lg:grid-cols-3">
			<div class="text-center self-center lg:px-7">
				<p>{event.time}</p>
			</div>
			<div class="lg:self-center">
				<h3 class="text-lg lg:text-xl">{event.title}</h3>
				<p class="lg:text-justify">{event.subtitle}</p>
			</div>
			<div class="lg:self-center lg:px-7">
				<p class="text-center lg:text-left">{event.address}</p>
			</div>
		</div>
	{/each}
</section>
