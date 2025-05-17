<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Events from '$lib/components/Events.svelte';
	import Media from '$lib/components/Media.svelte';
	import Offerings from '$lib/components/Offerings.svelte';
	import About from '$lib/components/About.svelte';
	import Club from '$lib/components/Club.svelte';
	import CTA from '$lib/components/CTA.svelte';

	interface Props {
		data: {
			events: {
				title: string;
				subtitle: string;
				address: string;
				time: number;
			}[];
			content: {
				media_id: number;
				subtitle: string;
				content_id?: string;
			}[];
		};
	}

	const { data }: Props = $props();

	// TODO: Make this modular and not hard coded
	// NOTE: Maybe by adding the id in the db table Content to the id of the element
	const homeImage = data.content
		.find((image) => image.content_id === 'home')
		?.media_id.toString();

	// FIX: Typescript typesThe operand of a 'delete' operator must be optional.
	const media = data.content
		.filter((image) => image.content_id?.includes('media'))
		.map((image) => {
			const cleanImage = { ...image };
			delete cleanImage.content_id;
			return cleanImage;
		});
</script>

<svelte:head>
	<title>Helmstedter Chor- und Singschule</title>
</svelte:head>

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
