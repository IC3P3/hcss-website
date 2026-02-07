<script lang="ts">
	import Facebook from '$lib/assets/Facebook.svelte';
	import Instagram from '$lib/assets/Instagram.svelte';
	import Whatapp from '$lib/assets/Whatapp.svelte';
	import Youtube from '$lib/assets/Youtube.svelte';
</script>

<div class="flex items-center gap-4 text-gray-50">
	<a
		href="https://www.instagram.com/helmstedter_chor/"
		target="_blank"
		class="transition-colors duration-300 hover:text-gray-400"
	>
		<Instagram classes="h-8 w-8" />
	</a>
	<a
		href="https://whatsapp.com/channel/0029Vb7EWUtFnSzFjy8BBI0S"
		target="_blank"
		class="transition-colors duration-300 hover:text-gray-400"
	>
		<Whatapp classes="h-8 w-8" />
	</a>
	<a
		href="https://youtube.com"
		target="_blank"
		class="transition-colors duration-300 hover:text-gray-400"
	>
		<Youtube classes="h-8 w-8" />
	</a>
	<a
		href="https://facebook.com"
		target="_blank"
		class="transition-colors duration-300 hover:text-gray-400"
	>
		<Facebook classes="h-8 w-8" />
	</a>
</div>
