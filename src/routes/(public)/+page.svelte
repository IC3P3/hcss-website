<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Helmstedter Chor- und Singschule</title>
</svelte:head>

<Hero img={data.heroImg} />
<div class="mx-auto max-w-5xl space-y-12 p-8"></div>
