<script lang="ts">
	import Facebook from '$lib/assets/Facebook.svelte';
	import Instagram from '$lib/assets/Instagram.svelte';
	import Whatapp from '$lib/assets/WhatsApp.svelte';
	import Youtube from '$lib/assets/YouTube.svelte';

	let {
		color = 'text-gray-50',
		hoverColor = 'hover:text-hcss-secondary'
	}: { color?: string; hoverColor?: string } = $props();
</script>

<div class="flex items-center gap-4 {color}">
	<a
		href="https://www.instagram.com/helmstedter_chor/"
		target="_blank"
		rel="noopener noreferrer"
		class="transition-colors duration-300 {hoverColor}"
		aria-label="Instagram-Seite der Helmstedter Chor- und Singschule"
	>
		<Instagram classes="h-8 w-8" />
	</a>
	<a
		href="https://whatsapp.com/channel/0029Vb7EWUtFnSzFjy8BBI0S"
		target="_blank"
		rel="noopener noreferrer"
		class="transition-colors duration-300 {hoverColor}"
		aria-label="WhatsApp-Kanal der Helmstedter Chor- und Singschule"
	>
		<Whatapp classes="h-8 w-8" />
	</a>
	<a
		href="https://youtube.com"
		target="_blank"
		rel="noopener noreferrer"
		class="transition-colors duration-300 {hoverColor}"
		aria-label="YouTube-Seite der Helmstedter Chor- und Singschule"
	>
		<Youtube classes="h-8 w-8" />
	</a>
	<a
		href="https://facebook.com"
		target="_blank"
		rel="noopener noreferrer"
		class="transition-colors duration-300 {hoverColor}"
		aria-label="Facebook-Seite der Helmstedter Chor- und Singschule"
	>
		<Facebook classes="h-8 w-8" />
	</a>
</div>
