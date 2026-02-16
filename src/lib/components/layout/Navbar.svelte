<script lang="ts">
	import logo from '$lib/assets/logo.webp';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';

	import type { NavbarItem } from '$lib/types/Navbar';

	const { items, isLoggedIn } = $props<{ items: NavbarItem[]; isLoggedIn: boolean }>();

	let menuOpen = $state(false);
	let menuRef = $state<HTMLDivElement>();
	let menuDropdown = $state<HTMLDivElement>();

	const mobileLink =
		'flex items-center px-4 py-3 transition-colors duration-200 hover:bg-blue-800 hover:text-gray-50';
	const desktopLink =
		'flex h-full items-center px-4 transition-colors duration-200 hover:bg-blue-800 hover:text-gray-50';
	const activeClass = 'bg-blue-800 text-gray-50';
	const inactiveClass = 'text-gray-900';

	function trapFocus(e: KeyboardEvent) {
		if (e.key !== 'Tab' || !menuDropdown) return;

		const focusable = menuDropdown.querySelectorAll<HTMLElement>('a, button');
		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}

	let currentHash = $state('');

	function isActive(href: string): boolean {
		if (href.startsWith('#')) {
			return currentHash === href;
		}
		return page.url.pathname === href;
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') menuOpen = false;
		if (menuOpen) trapFocus(e);
	}}
	onclick={(e) => {
		if (menuOpen && menuRef && !menuRef.contains(e.target as Node)) menuOpen = false;
	}}
	onhashchange={() => (currentHash = window.location.hash)}
/>

<nav class="fixed z-50 w-full bg-gray-200 text-gray-900">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
		<a href={resolve('/')} class="flex items-center gap-3">
			<img src={logo} alt="Logo der Helmstedter Chor- und Singschule" class="h-10" />
			<span class="text-xl font-semibold text-blue-950">HCSS</span>
		</a>

		<div bind:this={menuRef} class="md:hidden">
			<button
				type="button"
				aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
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
					id="mobile-menu"
					bind:this={menuDropdown}
					transition:slide={{ duration: 200 }}
					class="absolute top-16 left-0 w-full bg-gray-200 p-4 shadow-lg"
				>
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					{#each items as item (item.id)}
						<a
							class="{mobileLink} {isActive(item.href) ? activeClass : inactiveClass}"
							onclick={() => (menuOpen = false)}
							href={item.href}>{item.title}</a
						>
					{/each}
					<!-- eslint-enable svelte/no-navigation-without-resolve -->

					{#if isLoggedIn}
						<form action={resolve('/admin/logout')} method="POST">
							<button type="submit" class={mobileLink}>Abmelden</button>
						</form>
					{/if}
				</div>
			{/if}
		</div>

		<div class="hidden h-full items-center gap-6 md:flex">
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			{#each items as item (item.id)}
				<a
					class="{desktopLink} {isActive(item.href) ? activeClass : inactiveClass}"
					href={item.href}>{item.title}</a
				>
			{/each}
			<!-- eslint-enable svelte/no-navigation-without-resolve -->

			{#if isLoggedIn}
				<form class="h-full" action={resolve('/admin/logout')} method="POST">
					<button type="submit" class={desktopLink}>Abmelden</button>
				</form>
			{/if}
		</div>
	</div>
</nav>
