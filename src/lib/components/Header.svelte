<script lang="ts">
	let { homeImage = $bindable() } = $props();

	homeImage = `/api/content/image?id=${homeImage}`;
</script>

<section
	id="home"
	class="items-center bg-cover bg-fixed bg-center"
	style="background-image: url({homeImage})"
>
	<div
		class="bg-image flex h-screen flex-col items-center justify-center bg-cover bg-center"
		style="background-color: rgba(110, 112, 116, 0.5);"
	>
		<h1 class="text-center text-4xl font-bold text-white">Helmsteder Chor- und Singschule</h1>
		<p class="mx-5 mt-4 max-w-lg px-4 text-center text-white">
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
			invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
			ipsum dolor sit amet.
		</p>
		<a
			href="/events"
			class="mt-4 rounded-none bg-blue-700 px-7 py-3 text-xs font-bold text-white uppercase hover:bg-blue-900"
			>Unsere Termine</a
		>
	</div>
</section>
