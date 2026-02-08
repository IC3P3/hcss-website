<script lang="ts">
	import logo from '$lib/assets/logo.png';

	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';

	const { items } = $props();
</script>

<nav class="fixed z-50 w-full bg-gray-200 text-gray-900">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
		<a href={resolve('/')} class="flex items-center gap-3">
			<img src={logo} alt="Logo der Helmstedter Chor- und Singschule" class="h-10" />
			<span class="text-xl font-semibold">HCSS</span>
		</a>
		<div class="flex h-full items-center gap-6">
			{#each items as item}
				<a
					class="flex h-full items-center px-4 text-gray-900 transition-colors duration-200 hover:bg-blue-800 hover:text-gray-50"
					href={item.href}>{item.title}</a
				>
			{/each}
			<!-- TODO: Check for being logged in -->
			{#if true}
				<form class="h-full" action={resolve('/admin/logout')} method="POST" use:enhance>
					<button
						type="submit"
						class="flex h-full cursor-pointer items-center px-4 text-gray-900 transition-colors duration-200 hover:bg-blue-800 hover:text-gray-50"
						>Abmelden</button
					>
				</form>
			{/if}
		</div>
	</div>
</nav>
