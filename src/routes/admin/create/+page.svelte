<script lang="ts">
	import { enhance } from '$app/forms';
	import imagePlaceholder from '$lib/assets/placeholder-image.png';

	let uploadedImage: string = $state('');

	interface Props {
		data: {
			events: {
				id: number;
				title: string;
			}[];
		};
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
	<h1 class="mb-6 text-3xl font-extrabold text-blue-950">Einträge hinzufügen</h1>

	<section class="mb-12 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
		<h2 class="mb-4 text-2xl font-semibold text-blue-950">Veranstaltung hinzufügen</h2>

		<!-- TODO: Add feedback after sumbmit -->
		<form method="POST" class="space-y-6" use:enhance>
			<div>
				<label for="title" class="mb-2 block font-medium text-gray-700">Titel</label>
				<input
					name="title"
					id="title"
					type="text"
					required
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="subtitle" class="mb-2 block font-medium text-gray-700">Untertitel</label>
				<input
					name="subtitle"
					id="subtitle"
					type="text"
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="address" class="mb-2 block font-medium text-gray-700">Adresse</label>
				<input
					name="address"
					id="address"
					type="text"
					required
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="time" class="mb-2 block font-medium text-gray-700">Uhrzeit</label>
				<input
					name="time"
					id="time"
					type="datetime-local"
					required
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<div class="flex justify-center">
				<button
					type="submit"
					formaction="?/createEvent"
					class="rounded-lg bg-blue-700 px-8 py-3 text-sm font-semibold text-white uppercase transition-colors hover:bg-blue-800"
				>
					Veranstaltung erstellen
				</button>
			</div>
		</form>
	</section>

	<section class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
		<h2 class="mb-4 text-2xl font-semibold text-blue-950">Bilder hinzufügen</h2>

		<!-- TODO: Clear preview image after submit
					Add feedback after submit -->
		<form
			method="POST"
			action="?/addImage"
			enctype="multipart/form-data"
			class="flex flex-wrap space-y-6"
			use:enhance
		>
			<div class="w-full space-y-6 md:w-1/2">
				<div>
					<label for="image" class="mb-2 block font-medium text-gray-700">Bild</label>
					<input
						name="image"
						id="image"
						type="file"
						accept="image/*"
						required
						onchange={handleImageSelection}
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
				</div>

				<div>
					<label for="image-subtitle" class="mb-2 block font-medium text-gray-700">Untertitel</label
					>
					<input
						name="subtitle"
						id="image-subtitle"
						type="text"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
				</div>

				<div>
					<label for="event_id" class="mb-2 block font-medium text-gray-700">Veranstaltung</label>
					<select
						name="event_id"
						id="event_id"
						required
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					>
						{#each data.events as event}
							<option value={event.id}>{event.title}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="flex w-full items-start justify-center p-4 md:w-1/2">
				<div class="flex h-auto w-full items-center justify-center">
					{#if uploadedImage}
						<img
							src={uploadedImage}
							alt="Hochgeladenes Bild"
							class="h-auto max-h-56 w-full max-w-[50%] object-contain"
						/>
					{:else}
						<img
							src={imagePlaceholder}
							alt="Platzhalter Bild"
							class="h-auto w-full max-w-[50%] object-contain"
						/>
					{/if}
				</div>
			</div>

			<div class="flex justify-center">
				<button
					type="submit"
					class="rounded-lg bg-blue-700 px-8 py-3 text-sm font-semibold text-white uppercase transition-colors hover:bg-blue-800"
				>
					Bild hinzufügen
				</button>
			</div>
		</form>
	</section>
</section>
