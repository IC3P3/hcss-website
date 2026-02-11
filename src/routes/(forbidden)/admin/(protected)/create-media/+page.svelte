<script lang="ts">
	import { enhance } from '$app/forms';

	const { data, form } = $props();

	let submitting = $state(false);
	let showMessage = $state(false);
	let previewImg = $state<string | null>(null);

	$effect(() => {
		if (form) {
			showMessage = true;
			const timeout = setTimeout(() => (showMessage = false), 5000);
			return () => clearTimeout(timeout);
		}
	});

	function onFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file) {
			previewImg = URL.createObjectURL(file);
		} else {
			previewImg = null;
		}
	}
</script>

<div class="mx-auto max-w-5xl px-4 py-10">
	<div class="flex gap-8">
		<form
			class="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-8 shadow"
			method="POST"
			enctype="multipart/form-data"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					submitting = false;
					return update();
				};
			}}
		>
			<h1 class="text-2xl font-semibold">Medium erstellen</h1>

			{#if showMessage && form?.error}
				<p class="text-sm text-red-600">{form.error}</p>
			{:else if showMessage && form?.success}
				<p class="text-sm text-green-600">{form.success}</p>
			{/if}

			<div class="flex flex-col gap-1">
				<label for="title" class="text-sm font-medium">Titel</label>
				<input
					type="text"
					id="title"
					name="title"
					required
					class="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-700 focus:outline-none"
				/>
			</div>

			<div class="flex flex-col gap-1">
				<label for="description" class="text-sm font-medium">Beschreibung</label>
				<textarea
					id="description"
					name="description"
					class="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-700 focus:outline-none"
				></textarea>
			</div>

			<div class="flex flex-col gap-1">
				<label for="media" class="text-sm font-medium">Bild (WebP)</label>
				<input
					type="file"
					onchange={onFileChange}
					id="media"
					name="media"
					accept="image/webp"
					required
					class="rounded border px-3 py-2"
				/>
			</div>

			<div class="flex flex-col gap-1">
				<label for="event" class="text-sm font-medium">Veranstaltung</label>
				<select
					id="event"
					name="event"
					class="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-700 focus:outline-none"
				>
					<option value="">Keine</option>
					{#each data.events as event}
						<option value={event.id}
							>{`${event.title} - ${new Intl.DateTimeFormat('de-DE', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric'
							}).format(event.date)}`}</option
						>
					{/each}
				</select>
			</div>

			<button
				type="submit"
				disabled={submitting}
				class="rounded bg-blue-700 py-2 text-white hover:bg-blue-800 disabled:opacity-50"
			>
				{submitting ? 'Erstellen...' : 'Erstellen'}
			</button>
		</form>
		{#if previewImg}
			<div class="hidden shrink-0 lg:block">
				<img
					src={previewImg}
					alt="Vorschau"
					class="h-full w-full rounded-lg object-contain shadow"
				/>
			</div>
		{/if}
	</div>
</div>
