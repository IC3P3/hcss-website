<script lang="ts">
	import logo from '$lib/assets/logo.png';

	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	const { items } = $props();

	let menuOpen = $state(false);
	let menuRef = $state<HTMLDivElement>();
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') menuOpen = false;
	}}
	onclick={(e) => {
		if (menuOpen && menuRef && !menuRef.contains(e.target as Node)) menuOpen = false;
	}}
/>!menuRef.contains(e.target)

<nav class="fixed z-50 w-full bg-gray-200 text-gray-900">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
		<a href={resolve('/')} class="flex items-center gap-3">
			<img src={logo} alt="Logo der Helmstedter Chor- und Singschule" class="h-10" />
			<span class="text-xl font-semibold">HCSS</span>
		</a>

		<div bind:this={menuRef} class="md:hidden">
			<button
				type="button"
				aria-label="Menü öffnen"
				class="flex h-10 w-10 items-center justify-center rounded-lg text-gray-900 hover:bg-gray-300 md:hidden"
				onclick={() => (menuOpen = !menuOpen)}
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 17 14" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15"
					/>
				</svg>
			</button>

			{#if menuOpen}
				<div
					transition:slide={{ duration: 200 }}
					class="absolute top-16 left-0 w-full bg-gray-200 p-4"
				>
					{#each items as item}
						<a
							class="flex items-center px-4 py-3 text-gray-900 transition-colors duration-200 hover:bg-blue-800 hover:text-gray-50"
							onclick={() => (menuOpen = false)}
							href={item.href}>{item.title}</a
						>
					{/each}
					<!-- TODO: Check for being logged in -->
					{#if true}
						<form action={resolve('/admin/logout')} method="POST" use:enhance>
							<button
								type="submit"
								class="flex items-center px-4 py-3 text-gray-900 transition-colors duration-200 hover:bg-blue-800 hover:text-gray-50"
								>Abmelden</button
							>
						</form>
					{/if}
				</div>
			{/if}
		</div>

		<div class="hidden h-full items-center gap-6 md:flex">
			{#each items as item}
				<a
					class="flex h-full items-center px-4 text-gray-900 transition-colors duration-200 hover:bg-blue-800 hover:text-gray-50"
					onclick={() => (menuOpen = false)}
					href={item.href}>{item.title}</a
				>
			{/each}
			<!-- TODO: Check for being logged in -->
			{#if true}
				<form class="h-full" action={resolve('/admin/logout')} method="POST" use:enhance>
					<button
						type="submit"
						class="flex h-full items-center px-4 text-gray-900 transition-colors duration-200 hover:bg-blue-800 hover:text-gray-50"
						>Abmelden</button
					>
				</form>
			{/if}
		</div>
	</div>
</nav>
