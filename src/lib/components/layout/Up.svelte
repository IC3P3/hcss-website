<script lang="ts">
	import { fade } from 'svelte/transition';

	let showButton = $state(false);

	function onScroll() {
		showButton = window.scrollY > 300;
	}

	function scrollTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window onscroll={onScroll} />

{#if showButton}
	<button
		class="fixed right-8 bottom-6 z-50 h-14 w-14 cursor-pointer rounded-full bg-gray-200 text-3xl text-hcss-primary-700"
		in:fade={{ duration: 300 }}
		out:fade={{ duration: 150 }}
		onclick={scrollTop}
		aria-label="Nach oben scrollen"
	>
		↑
	</button>
{/if}
