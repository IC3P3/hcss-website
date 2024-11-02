<script lang="ts">
	export let data: PageData;

	import type { PageData } from './$types';

	import Header from '$lib/components/Header.svelte';

	const homeImage = data.content.find((image) => image['homeContent.id'] === 'home')?.id.toString();
</script>

{#if homeImage}
	<Header {homeImage} />
{/if}
