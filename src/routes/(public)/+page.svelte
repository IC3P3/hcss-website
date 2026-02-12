<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Events from '$lib/components/Events.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Media from '$lib/components/Media.svelte';
	import Offerings from '$lib/components/Offerings.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Helmstedter Chor- und Singschule</title>
	<meta
		name="description"
		content="Helmstedter Chor- und Singschule e.V. — Placeholder description"
	/>
</svelte:head>

<Hero img={data.heroImg} />
<div class="mx-auto max-w-7xl space-y-12 p-8">
	<Events events={data.events} />
</div>
<Media media={data.media} />
<About />
<Offerings offeringImages={data.offeringImages} />
