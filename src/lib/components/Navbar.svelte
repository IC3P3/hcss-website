<script lang="ts">
	import { page } from '$app/state';

	import logo from '$lib/assets/logo.png';
</script>

<!-- TODO: Small extend button doesn't extend Navbar -->
{#if page.url.pathname.includes('admin')}
	<nav class="border-gray-200 bg-gray-50 fixed w-full z-50">
		<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			<a href="/" class="flex items-center">
				<img src={logo} class="h-8 mr-3" alt="Logo der Helmstedter Chor- und Singschule" />
				<span class="self-center text-2xl font-semibold whitespace-nowrap">HCSS</span>
			</a>
			<button
				data-collapse-toggle="navbar-solid-bg"
				type="button"
				class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
				aria-controls="navbar-solid-bg"
				aria-expanded="false"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-5 h-5"
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
					class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent"
				>
					<li>
						<a
							href="/admin/create"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>Inhalt erstellen</a
						>
					</li>
					<li>
						<a
							href="/admin/customize"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>Angezeigte Inhalte anpassen</a
						>
					</li>
					<li>
						<a
							href="/admin/logout"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>Abmelden</a
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>
{:else}
	<nav class="border-gray-200 bg-gray-50 fixed w-full z-50">
		<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			<a href="/" class="flex items-center">
				<img src={logo} class="h-8 mr-3" alt="Logo der Helmstedter Chor- und Singschule" />
				<span class="self-center text-2xl font-semibold whitespace-nowrap">HCSS</span>
			</a>
			<button
				data-collapse-toggle="navbar-solid-bg"
				type="button"
				class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
				aria-controls="navbar-solid-bg"
				aria-expanded="false"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-5 h-5"
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
					class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent"
				>
					<li>
						<a
							href="#about"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>Über uns</a
						>
					</li>
					<li>
						<a
							href="#events"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>Termine</a
						>
					</li>
					<li>
						<a
							href="#offering"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>Angebote</a
						>
					</li>
					<li>
						<a
							href="#media"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>Medien</a
						>
					</li>
					<li>
						<a
							href="#clubs"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>Vereine</a
						>
					</li>
					<li>
						<a
							href="#legal"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>Impressum</a
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>
{/if}
