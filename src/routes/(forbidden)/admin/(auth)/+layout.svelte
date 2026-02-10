<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';

	const { children, data } = $props();

	const isLoggedIn = $derived(Boolean(data.user));
</script>

<svelte:head>
	<title>HCSS - Anmeldung</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-60 focus:rounded focus:bg-blue-800 focus:px-4 focus:py-2
  focus:text-gray-50"
	>
		Zum Inhalt springen
	</a>

	<Navbar items={[]} {isLoggedIn} />
	<main id="main-content" class="grow pt-16">{@render children()}</main>
</div>
