<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Club from '$lib/components/Club.svelte';
	import CTA from '$lib/components/CTA.svelte';
	import Events from '$lib/components/Events.svelte';
	import Header from '$lib/components/Header.svelte';
	import Media from '$lib/components/Media.svelte';
	import Offerings from '$lib/components/Offerings.svelte';

	interface Props {
		data: {
			events: {
				title: string;
				subtitle: string;
				address: string;
				time: number;
			}[];
			content: {
				id: number;
				mediaId: number;
				subtitle: string;
				contentId?: string;
			}[];
		};
	}

	const { data }: Props = $props();

	// NOTE: Maybe it's possible to make this more modular instead of hard coding keywords
	const homeImage = data.content.find((image) => image.contentId === 'home')?.mediaId.toString();

	const media = data.content
		.filter((image) => image.contentId?.includes('media'))
		.map((image) => {
			const cleanImage = { ...image };
			delete cleanImage.contentId;
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
