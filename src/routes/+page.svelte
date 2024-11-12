<script lang="ts">
	export let data: PageData;

	import type { PageData } from './$types';

	import Header from '$lib/components/Header.svelte';
	import Events from '$lib/components/Events.svelte';
	import Media from '$lib/components/Media.svelte';
	import Offerings from '$lib/components/Offerings.svelte';
	import About from '$lib/components/About.svelte';
	import Club from '$lib/components/Club.svelte';
	import CTA from '$lib/components/CTA.svelte';

	// TODO: Make this modular and not hard coded
	// NOTE: Maybe by adding the id in the db table Content to the id of the element
	const homeImage = data.content.find((image) => image['content.id'] === 'home')?.id.toString();

	// FIX: Typescript types
	let media = data.content
		.filter((image) => image['content.id'].includes('media'))
		.map((image) => {
			const cleanImage = { ...image };
			delete cleanImage['content.id'];
			return cleanImage;
		});
</script>

{#if homeImage}
	<Header {homeImage} />
{/if}

<Events events={data.events} />
<!-- FIX: More TS type fixing -->
<Media {media} />
<Offerings />
<About />
<Club />
<CTA />
