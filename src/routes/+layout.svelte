<script lang="ts">
	import './layout.css';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	const { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="grow">{@render children()}</main>
	<Footer />
</div>
