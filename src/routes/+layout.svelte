<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	const { children } = $props();
</script>

<Navbar />
{@render children()}
<Footer />
