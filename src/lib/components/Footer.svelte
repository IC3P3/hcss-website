<script lang="ts">
	import logo from '$lib/assets/logo.png';
</script>

<footer class="bg-white mt-4">
	<section id="legal">
		<div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
			<div class="md:flex md:justify-between">
				<div class="mb-8">
					<a href="/" class="flex items-center">
						<img src={logo} class="h-8 mr-3" alt="Logo der Helmstedter Chor- und Singschule" />
						<span class="self-center text-2xl font-semibold whitespace-nowrap">HCSS</span>
					</a>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
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
					<ul class="text-gray-500 font-medium">
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
					<ul class="text-gray-500 font-medium">
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
				<div class="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
					<a href="https://facebook.com/" class="text-gray-500 hover:text-gray-900">
						<svg
							class="w-4 h-4"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 8 19"
						>
							<path
								fill-rule="evenodd"
								d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="sr-only">Facebook Seite der HCSS</span>
					</a>
				</div>
			</div>
		</div>
	</section>
</footer>
