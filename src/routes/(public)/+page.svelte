<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.webp';
	import About from '$lib/components/About.svelte';
	import Events from '$lib/components/Events.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Media from '$lib/components/Media.svelte';
	import Offerings from '$lib/components/Offerings.svelte';

	const { data } = $props();

	const TITLE = 'Helmstedter Chor- und Singschule';
	const DESCRIPTION =
		'Die Helmstedter Chor- und Singschule e.V. bietet musikalische Ausbildung in Chor und Gesang. Konzerte, Termine und Impressionen aus dem Vereinsleben.';

	const logoUrl = $derived(new URL(logo, page.url.origin).href);
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:image" content={logoUrl} />
	<meta property="og:locale" content="de_DE" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<Hero img={data.heroImg} />
<About />
<Offerings offeringImages={data.offeringImages} />
<Media media={data.media} />
<Events events={data.events} />
