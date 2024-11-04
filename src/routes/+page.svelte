<script lang="ts">
	export let data: PageData;

	import type { PageData } from './$types';

	import Header from '$lib/components/Header.svelte';
	import Events from '$lib/components/Events.svelte';
	import Offerings from '$lib/components/Offerings.svelte';

	// TODO: Make this modular and not hard coded
	// NOTE: Maybe by adding the id in the db table HomeContent to the id of the element
	const homeImage = data.content.find((image) => image['homeContent.id'] === 'home')?.id.toString();
</script>

{#if homeImage}
	<Header {homeImage} />
{/if}

<Events events={data.events} />
<Offerings />
