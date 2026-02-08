<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { NavbarItems } from '$lib/types/Navbar';

	const { children } = $props();

	const items: NavbarItems[] = [
		{ title: 'Veranstaltungen', href: '#veranstaltungen' },
		{ title: 'Medien', href: '#medien' },
		{ title: 'Über uns', href: '#ueberuns' },
		{ title: 'Angebote', href: '#angebote' },
		{ title: 'Vereine', href: '#vereine' }
	];
</script>

<div class="flex min-h-screen flex-col">
	<Navbar {items} />
	<main class="grow">{@render children()}</main>
	<Footer />
</div>
