<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { NavbarItem } from '$lib/types/Navbar';

	const { children } = $props();

	const items: NavbarItem[] = [
		{ title: 'Veranstaltungen', href: '#veranstaltungen' },
		{ title: 'Medien', href: '#medien' },
		{ title: 'Über uns', href: '#ueberuns' },
		{ title: 'Angebote', href: '#angebote' },
		{ title: 'Vereine', href: '#vereine' }
	];
</script>

<div class="flex min-h-screen flex-col">
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-60 focus:rounded focus:bg-blue-800 focus:px-4 focus:py-2
  focus:text-gray-50"
	>
		Zum Inhalt springen
	</a>

	<Navbar {items} />
	<main class="grow">{@render children()}</main>
	<Footer />
</div>
