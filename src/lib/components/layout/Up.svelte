<script lang="ts">
	import { fade } from 'svelte/transition';

	let showButton = $state(false);

	const NEAR_BOTTOM_OFFSET_PX = 50;
	const SHOW_AFTER_SCROLL_PX = 300;

	function onScroll() {
		const atBottom =
			window.innerHeight + window.scrollY >=
			document.body.scrollHeight - NEAR_BOTTOM_OFFSET_PX;
		showButton = window.scrollY > SHOW_AFTER_SCROLL_PX && !atBottom;
	}

	function scrollTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window onscroll={onScroll} />

{#if showButton}
	<button
		class="fixed right-8 bottom-6 z-50 h-14 w-14 cursor-pointer rounded-full bg-gray-200 text-3xl text-hcss-primary-700 shadow-lg"
		in:fade={{ duration: 300 }}
		out:fade={{ duration: 150 }}
		onclick={scrollTop}
		aria-label="Nach oben scrollen"
	>
		↑
	</button>
{/if}
