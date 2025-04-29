<script lang="ts">
	let { homeImage = $bindable() } = $props();

	homeImage = `/api/content/image?id=${homeImage}`;
</script>

<section
	id="home"
	class="bg-fixed bg-center bg-cover items-center"
	style="background-image: url({homeImage})"
>
	<div
		class="bg-image flex flex-col justify-center bg-cover bg-center items-center h-screen"
		style="background-color: rgba(110, 112, 116, 0.5);"
	>
		<h1 class="text-white text-4xl font-bold text-center">Helmsteder Chor- und Singschule</h1>
		<p class="text-white text-center mt-4 max-w-lg px-4 mx-5">
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
			invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
			ipsum dolor sit amet.
		</p>
		<a
			href="/events"
			class="bg-blue-700 text-white mt-4 font-bold text-xs uppercase px-7 py-3 rounded-none hover:bg-blue-900"
			>Unsere Termine</a
		>
	</div>
</section>
