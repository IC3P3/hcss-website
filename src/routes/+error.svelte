<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	const NOT_FOUND = 404;
</script>

<svelte:head>
	<title>Fehler {page.status} - HCSS</title>
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
	<h1 class="text-6xl font-extrabold text-hcss-primary-950">{page.status}</h1>
	<p class="text-lg text-gray-600">
		{page.status === NOT_FOUND
			? 'Diese Seite wurde nicht gefunden.'
			: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'}
	</p>
	<a
		href={resolve('/')}
		class="rounded bg-hcss-primary-700 px-6 py-2 text-white transition-colors duration-200 hover:bg-hcss-primary-800"
	>
		Zur Startseite
	</a>
</div>
