<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';

	import imagePlaceholder from '$lib/assets/placeholder-image.png';

	let uploadedImage: string = $state();

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	async function handleImageSelection(e: Event) {
		const file = (e.target as HTMLInputElement)?.files?.[0];

		if (!file) return;

		const image = new Image();
		const reader = new FileReader();

		reader.onload = function (e) {
			if (e.target?.result) {
				image.src = e.target.result as string;
			}
		};
		reader.readAsDataURL(file);

		image.onload = function () {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			if (!ctx) return;

			canvas.width = image.width;
			canvas.height = image.height;

			ctx.drawImage(image, 0, 0);

			const webpImage = canvas.toDataURL('image/webp');
			const byteString = atob(webpImage.split(',')[1]);
			const arrayBuffer = new ArrayBuffer(byteString.length);
			const uint8Array = new Uint8Array(arrayBuffer);

			for (let i = 0; i < byteString.length; i++) {
				uint8Array[i] = byteString.charCodeAt(i);
			}

			const webpBlob = new Blob([uint8Array], { type: 'image/webp' });

			uploadedImage = URL.createObjectURL(webpBlob);

			const fileInput = document.querySelector('#image') as HTMLInputElement;
			const dataTransfer = new DataTransfer();
			const convertedFile = new File([webpBlob], file.name.replace(/\.[^/.]+$/, '.webp'), {
				type: 'image/webp'
			});
			dataTransfer.items.add(convertedFile);
			fileInput.files = dataTransfer.files;
		};
	}
</script>

<section class="mx-auto max-w-screen-xl p-6 py-8 pt-20">
	<h1 class="text-3xl font-extrabold text-blue-950 mb-6">Einträge hinzufügen</h1>

	<section class="mb-12 bg-white p-6 rounded-lg shadow-md border border-gray-200">
		<h2 class="text-2xl font-semibold text-blue-950 mb-4">Veranstaltung hinzufügen</h2>

		<!-- TODO: Add feedback after sumbmit -->
		<form method="POST" class="space-y-6" use:enhance>
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

		<!-- TODO: Clear preview image after submit
					Add feedback after submit -->
		<form
			method="POST"
			action="?/addImage"
			enctype="multipart/form-data"
			class="space-y-6 flex flex-wrap"
			use:enhance
		>
			<div class="w-full md:w-1/2 space-y-6">
				<div>
					<label for="image" class="block text-gray-700 font-medium mb-2">Bild</label>
					<input
						name="image"
						id="image"
						type="file"
						accept="image/*"
						required
						onchange={handleImageSelection}
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
					<select
						name="event_id"
						id="event_id"
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
					>
						{#each data.events as event}
							<option value={event.id}>{event.title}</option>
						{/each}
					</select>
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
