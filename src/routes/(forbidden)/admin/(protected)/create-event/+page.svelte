<script lang="ts">
	import { enhance } from '$app/forms';

	const { form } = $props();

	let submitting = $state(false);
	let showMessage = $state(false);

	const FIVE_SECONDS_IN_MS = 5000;

	$effect(() => {
		if (form) {
			showMessage = true;
			const timeout = setTimeout(() => (showMessage = false), FIVE_SECONDS_IN_MS);
			return () => clearTimeout(timeout);
		}
	});
</script>

<div class="mx-auto max-w-3xl px-4 py-10">
	<form
		class="flex flex-col gap-4 p-8"
		method="POST"
		use:enhance={() => {
			submitting = true;
			return ({ update, result }) => {
				submitting = false;
				return update({ reset: result.type === 'success' });
			};
		}}
	>
		<h1 class="text-2xl font-semibold">Veranstaltung erstellen</h1>

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
				class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
			/>
		</div>

		<div class="flex flex-col gap-1">
			<label for="time" class="text-sm font-medium">Datum und Uhrzeit</label>
			<input
				type="datetime-local"
				id="time"
				name="time"
				required
				class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
			/>
		</div>

		<div class="flex flex-col gap-1">
			<label for="address" class="text-sm font-medium">Adresse</label>
			<input
				type="text"
				id="address"
				name="address"
				required
				placeholder="Straße Hausnummer, PLZ Ort"
				class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
			/>
			<p class="text-xs text-gray-500">
				Teile mit Komma trennen, jeder Teil wird als eigene Zeile angezeigt.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<label for="shortDescription" class="text-sm font-medium">Kurzbeschreibung</label>
			<input
				type="text"
				id="shortDescription"
				name="shortDescription"
				class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
			/>
		</div>

		<div class="flex flex-col gap-1">
			<label for="description" class="text-sm font-medium">Beschreibung</label>
			<textarea
				id="description"
				name="description"
				rows="4"
				class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
			></textarea>
		</div>

		<div class="flex flex-col gap-1">
			<label for="songs" class="text-sm font-medium">Lieder</label>
			<textarea
				id="songs"
				name="songs"
				rows="3"
				class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
			></textarea>
		</div>

		<div class="flex flex-col gap-1">
			<label for="participants" class="text-sm font-medium">Mitwirkende</label>
			<textarea
				id="participants"
				name="participants"
				rows="3"
				class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
			></textarea>
		</div>

		<button
			type="submit"
			disabled={submitting}
			class="rounded bg-hcss-primary-700 py-2 text-white hover:bg-hcss-primary-800 disabled:opacity-50"
		>
			{submitting ? 'Erstellen...' : 'Erstellen'}
		</button>
	</form>
</div>
