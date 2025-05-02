<script lang="ts">
	import Facebook from '$lib/assets/Facebook.svelte';
	import Instagram from '$lib/assets/Instagram.svelte';
	import Soundcloud from '$lib/assets/Soundcloud.svelte';
	import logo from '$lib/assets/logo.png';
</script>

<footer class="mt-4 bg-white">
	<section id="legal">
		<div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
			<div class="md:flex md:justify-between">
				<div class="mb-8">
					<a href="/" class="flex items-center">
						<img src={logo} class="mr-3 h-8" alt="Logo der Helmstedter Chor- und Singschule" />
						<span class="self-center text-2xl font-semibold whitespace-nowrap">HCSS</span>
					</a>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
				<div>
					<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Navigation</h2>
					<ul class="text-grey-500 fonz-medium">
						<li class="mb-4">
							<a href="/" class="hover:underline">Startseite</a>
						</li>
						<li class="mb-4">
							<a href="/about" class="hover:underline">Über uns</a>
						</li>
						<li class="mb-4">
							<a href="/events" class="hover:underline">Termine</a>
						</li>
						<li class="mb-4">
							<a href="/media" class="hover:underline">Medien</a>
						</li>
						<li class="mb-4">
							<a href="/club" class="hover:underline">Verein</a>
						</li>
						<li>
							<a href="/sponsoring" class="hover:underline">Förderverein</a>
						</li>
					</ul>
				</div>
				<div>
					<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
						Ansprechpartner des Vereins
					</h2>
					<ul class="font-medium text-gray-500">
						<li class="mb-4">
							<span>Person A</span>
						</li>
						<li class="mb-4">
							<span>1. Vorsitzender</span>
						</li>
						<li class="mb-4">
							<a href="mailto:person.a@mustermann.de" class="hover:underline"
								>person.a@mustermann.de</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
						Ansprechpartner des Fördervereins
					</h2>
					<ul class="font-medium text-gray-500">
						<li class="mb-4">
							<span>Person B</span>
						</li>
						<li class="mb-4">
							<span>Vorsitzender</span>
						</li>
						<li class="mb-4">
							<a href="mailto:person.b@mustermann.de" class="hover:underline"
								>person.b@mustermann.de</a
							>
						</li>
					</ul>
				</div>
			</div>
			<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
			<div class="sm:flex sm:items-center sm:justify-between">
				<span class="text-sm text-gray-500 sm:text-center"
					><a href="https://hcss-ev.de/" class="hover:underline">Helmstedter Chor- und Singschule</a
					></span
				>
				<div class="mt-4 flex space-x-5 sm:mt-0 sm:justify-center">
					<a href="https://facebook.com/" class="text-gray-500 hover:text-gray-900">
						<Facebook style="h-4" />
					</a>
					<a href="https://instagram.com/" class="text-gray-500 hover:text-gray-900">
						<Instagram style="h-4" />
					</a>
					<a href="https://soundcloud.com/" class="text-gray-500 hover:text-gray-900">
						<Soundcloud style="h-4" />
					</a>
				</div>
			</div>
		</div>
	</section>
</footer>
