<script lang="ts">
	import { resolve } from '$app/paths';

	import SocialMedia from '$lib/components/SocialMedia.svelte';
	import logo from '$lib/assets/logo.png';

	const { isLoggedIn } = $props();
</script>

<footer class="mt-4 flex flex-col">
	<div
		class="flex w-full flex-col items-center justify-center gap-4 bg-blue-800 p-4 py-6 sm:flex-row sm:gap-20 lg:py-8"
	>
		<span class="text-2xl font-bold text-gray-50 md:text-3xl">
			Hier sind wir auch zu finden!
		</span>
		<SocialMedia />
	</div>

	<div class="bg-gray-200 px-4 py-10 sm:px-8">
		<div class="mx-auto max-w-7xl">
			<div class="w-full">
				<span class="mb-8 flex items-center text-2xl font-extrabold text-gray-900">
					<img
						class="mr-3 h-8"
						src={logo}
						alt="Logo der Helmstedter Chor- und Singschule"
					/>
					HCSS
				</span>
			</div>

			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
				<div>
					<h3 class="text-md mb-5 font-semibold text-gray-900 uppercase">Impressum</h3>
					<address class="not-italic">
						<ul class="animated-underline font-medium text-gray-500">
							<li class="mb-2">
								<span>Helmstedter Chor- und Singschule e.V.</span>
							</li>
							<li class="mb-2">
								<span>Klosterstraße 12</span>
							</li>
							<li class="mb-2">
								<span>38350 Helmstedt</span>
							</li>
							<li class="mb-2">
								<a href="mailto:HCSS38350@gmx.de">HCSS38350@gmx.de</a>
							</li>
						</ul>
					</address>
				</div>

				<div>
					<h3 class="text-md mb-5 font-semibold text-gray-900 uppercase">Navigation</h3>
					<ul class="animated-underline font-medium text-gray-500">
						<li class="mb-2">
							<a href={resolve('/')}> Startseite </a>
						</li>
						<li class="mb-2">
							<a href={resolve('/termine')}>Veranstaltungen</a>
						</li>
						<li class="mb-2">
							<a href={resolve('/medien')}>Medien</a>
						</li>
					</ul>
				</div>
				<div>
					<h3 class="text-md mb-5 font-semibold text-gray-900 uppercase">
						Ansprechpartner
					</h3>
					<div class="space-y-4">
						<div>
							<p class="font-medium text-gray-900">
								Helmstedter Chor- und Singschule e.V.
							</p>
							<p class="text-sm text-gray-600">Max Mustermann - 1. Vorsitzender</p>
						</div>
						<div>
							<p class="font-medium text-gray-900">Förderverein</p>
							<p class="text-sm text-gray-600">Max Mustermann - Vorsitzender</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="flex w-full items-center justify-between bg-blue-800 px-4 py-4 sm:px-16 lg:py-6">
		<span class="text-sm font-bold text-gray-50 sm:text-base"
			>Helmstedter Chor- und Singschule e.V.</span
		>
		<a
			href={resolve('/admin/login')}
			class="text-xs font-extralight text-gray-50 underline transition-colors duration-300 select-none hover:text-gray-400"
		>
			<!-- TODO: Change text if logged in -->
			{#if !isLoggedIn}
				Login
			{:else}
				Administration
			{/if}
		</a>
	</div>
</footer>

<style>
	.animated-underline a::after {
		content: '';
		display: block;
		width: 0;
		height: 1px;
		background: currentColor;
		transition: width 0.3s ease;
	}

	.animated-underline a:hover::after,
	.animated-underline a:focus-visible::after {
		width: 100%;
	}

	.animated-underline a {
		display: inline-block;
	}
</style>
