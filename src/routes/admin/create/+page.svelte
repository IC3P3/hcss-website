<script lang="ts">
	import imagePlaceholder from '$lib/assets/placeholder-image.png';

	let uploadedImage: string;

	function handleImageSelection(e: Event) {
		const image = (e.target as HTMLInputElement)?.files?.[0];

		if (!image) return;

		uploadedImage = URL.createObjectURL(image);
	}
</script>

<section class="mx-auto max-w-screen-xl p-6 py-8 pt-20">
	<h1 class="text-3xl font-extrabold text-blue-950 mb-6">Einträge hinzufügen</h1>

	<section class="mb-12 bg-white p-6 rounded-lg shadow-md border border-gray-200">
		<h2 class="text-2xl font-semibold text-blue-950 mb-4">Veranstaltung hinzufügen</h2>

		<form method="POST" class="space-y-6">
			<div>
				<label for="title" class="block text-gray-700 font-medium mb-2">Titel</label>
				<input
					name="title"
					id="title"
					type="text"
					required
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="subtitle" class="block text-gray-700 font-medium mb-2">Untertitel</label>
				<input
					name="subtitle"
					id="subtitle"
					type="text"
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="address" class="block text-gray-700 font-medium mb-2">Adresse</label>
				<input
					name="address"
					id="address"
					type="text"
					required
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="time" class="block text-gray-700 font-medium mb-2">Uhrzeit</label>
				<input
					name="time"
					id="time"
					type="datetime-local"
					required
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<div class="flex justify-center">
				<button
					type="submit"
					formaction="?/createEvent"
					class="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-sm uppercase hover:bg-blue-800 transition-colors"
				>
					Veranstaltung erstellen
				</button>
			</div>
		</form>
	</section>

	<section class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
		<h2 class="text-2xl font-semibold text-blue-950 mb-4">Bilder hinzufügen</h2>

		<form
			method="POST"
			action="?/addImage"
			enctype="multipart/form-data"
			class="space-y-6 flex flex-wrap"
		>
			<div class="w-full md:w-1/2 space-y-6">
				<div>
					<label for="image" class="block text-gray-700 font-medium mb-2">Image</label>
					<input
						name="image"
						id="image"
						type="file"
						accept="image/webp"
						required
						on:change={handleImageSelection}
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
				</div>

				<div>
					<label for="image-subtitle" class="block text-gray-700 font-medium mb-2">Untertitel</label
					>
					<input
						name="subtitle"
						id="image-subtitle"
						type="text"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
				</div>

				<div>
					<label for="event_id" class="block text-gray-700 font-medium mb-2">Veranstaltung</label>
					<input
						name="event_id"
						id="event_id"
						type="number"
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
				</div>
			</div>

			<div class="w-full md:w-1/2 flex justify-center items-start p-4">
				<div class="w-full h-auto flex justify-center items-center">
					{#if uploadedImage}
						<img
							src={uploadedImage}
							alt="Hochgeladenes Bild"
							class="w-full max-w-[50%] max-h-56 h-auto object-contain"
						/>
					{:else}
						<img
							src={imagePlaceholder}
							alt="Platzhalter Bild"
							class="w-full max-w-[50%] h-auto object-contain"
						/>
					{/if}
				</div>
			</div>

			<div class="flex justify-center">
				<button
					type="submit"
					class="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-sm uppercase hover:bg-blue-800 transition-colors"
				>
					Bild hinzufügen
				</button>
			</div>
		</form>
	</section>
</section>
