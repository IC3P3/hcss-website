<script lang="ts">
	import { resolve } from '$app/paths';

	const { title, updated = '', children } = $props();
</script>

<section
	class="bg-gradient-to-br from-hcss-primary-950 via-hcss-primary-900 to-hcss-primary-700 px-4 py-16 text-center lg:py-20"
>
	<div class="mx-auto max-w-4xl">
		<a
			href={resolve('/')}
			class="mb-6 inline-flex items-center gap-1 text-sm font-medium text-hcss-primary-200 transition-colors duration-300 hover:text-gray-50"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 19l-7-7 7-7"
				/>
			</svg>
			Zur Startseite
		</a>
		<h1 class="text-4xl font-extrabold text-gray-50 lg:text-5xl">{title}</h1>
		{#if updated}
			<p class="mt-4 text-sm text-hcss-primary-200">Stand: {updated}</p>
		{/if}
	</div>
</section>

<article
	class="mx-auto max-w-4xl px-4 py-12 leading-relaxed font-light text-gray-600 lg:py-16
		[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-gray-200 [&_h2]:pb-2 [&_h2]:text-[1.75rem] [&_h2]:leading-tight [&_h2]:font-extrabold [&_h2]:text-hcss-primary-950
		[&_h2:first-child]:mt-0
		[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-hcss-primary-900
		[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-gray-800
		[&_p]:mb-4 [&_p]:text-justify
		[&_strong]:font-semibold [&_strong]:text-gray-900
		[&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc
		[&_li]:mb-2
		[&_a]:relative [&_a]:font-medium [&_a]:break-words [&_a]:text-hcss-secondary
		[&_a]:after:absolute [&_a]:after:bottom-0 [&_a]:after:left-0 [&_a]:after:h-px [&_a]:after:w-full [&_a]:after:origin-left [&_a]:after:scale-x-100 [&_a]:after:bg-current [&_a]:after:transition-transform [&_a]:after:duration-300
		[&_a:hover]:after:scale-x-0"
>
	{@render children()}
</article>
