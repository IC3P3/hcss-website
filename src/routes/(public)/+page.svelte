<script lang="ts">
	import Events from '$lib/components/Events.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Media from '$lib/components/Media.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Helmstedter Chor- und Singschule</title>
</svelte:head>

<Hero img={data.heroImg} />
<div class="mx-auto max-w-5xl space-y-12 p-8">
	<Events events={data.events} />
</div>
<Media media={data.media} />
