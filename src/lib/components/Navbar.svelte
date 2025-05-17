<script lang="ts">
	import { enhance } from '$app/forms';
	import logo from '$lib/assets/logo.png';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	onMount(() => {
		const toggleButton = document.querySelector('[data-collapse-toggle="navbar-solid-bg"]');
		const menu = document.getElementById('navbar-solid-bg');

		if (toggleButton && menu) {
			toggleButton.addEventListener('click', () => {
				menu.classList.toggle('hidden');
			});
		}
	});
</script>

<!-- TODO: Small extend button doesn't extend Navbar -->
{#if page.url.pathname.includes('admin')}
	<nav class="fixed z-50 w-full border-gray-200 bg-gray-50">
		<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
			<a href="/" class="flex items-center">
				<img src={logo} class="mr-3 h-8" alt="Logo der Helmstedter Chor- und Singschule" />
				<span class="self-center text-2xl font-semibold whitespace-nowrap">HCSS</span>
			</a>
			<button
				data-collapse-toggle="navbar-solid-bg"
				type="button"
				class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden"
				aria-controls="navbar-solid-bg"
				aria-expanded="false"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-5 w-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 17 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15"
					/>
				</svg>
			</button>
			<div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
				<ul
					class="mt-4 flex flex-col rounded-lg bg-gray-50 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent"
				>
					<li>
						<a
							href="/admin/create"
							class="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
							>Inhalt erstellen</a
						>
					</li>
					<li>
						<a
							href="/admin/customize"
							class="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
							>Angezeigte Inhalte anpassen</a
						>
					</li>
					<li>
						<form action="/admin/logout" method="POST" use:enhance>
							<button
								class="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
								type="submit">Abmelden</button
							>
						</form>
					</li>
				</ul>
			</div>
		</div>
	</nav>
{:else}
	<nav class="fixed z-50 w-full border-gray-200 bg-gray-50">
		<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
			<a href="/" class="flex items-center">
				<img src={logo} class="mr-3 h-8" alt="Logo der Helmstedter Chor- und Singschule" />
				<span class="self-center text-2xl font-semibold whitespace-nowrap">HCSS</span>
			</a>
			<button
				data-collapse-toggle="navbar-solid-bg"
				type="button"
				class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden"
				aria-controls="navbar-solid-bg"
				aria-expanded="false"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-5 w-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 17 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15"
					/>
				</svg>
			</button>
			<div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
				<ul
					class="mt-4 flex flex-col rounded-lg bg-gray-50 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent"
				>
					<li>
						<a
							href="#events"
							class="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
							>Termine</a
						>
					</li>
					<li>
						<a
							href="#media"
							class="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
							>Medien</a
						>
					</li>
					<li>
						<a
							href="#offering"
							class="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
							>Angebote</a
						>
					</li>
					<li>
						<a
							href="#about"
							class="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
							>Über uns</a
						>
					</li>
					<li>
						<a
							href="#clubs"
							class="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
							>Vereine</a
						>
					</li>
					<li>
						<a
							href="#legal"
							class="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
							>Impressum</a
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>
{/if}
