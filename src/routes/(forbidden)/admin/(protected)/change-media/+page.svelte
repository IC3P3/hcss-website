<script lang="ts">
	import { enhance } from '$app/forms';
	import Dropdown, { type DropdownOption } from '$lib/components/ui/Dropdown.svelte';

	const { data, form } = $props();

	let submitting = $state(false);
	let showMessage = $state(false);
	let search = $state('');
	let eventFilter = $state('');

	const FIVE_SECONDS_IN_MS = 5000;
	const NO_EVENT = 'none';

	const dateFormat = new Intl.DateTimeFormat('de-DE', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});

	const eventOptions = $derived<DropdownOption[]>(
		data.events.map((e) => ({
			value: String(e.id),
			label: `${e.title} - ${dateFormat.format(e.date)}`
		}))
	);

	const filterOptions = $derived<DropdownOption[]>([
		{ value: NO_EVENT, label: 'Ohne Veranstaltung' },
		...eventOptions
	]);

	const filtered = $derived.by(() => {
		const q = search.trim().toLowerCase();
		return data.media.filter((m) => {
			if (q && !m.title.toLowerCase().includes(q)) return false;
			if (eventFilter === NO_EVENT) return m.eventId === null;
			if (eventFilter) return String(m.eventId) === eventFilter;
			return true;
		});
	});

	$effect(() => {
		if (form) {
			showMessage = true;
			const timeout = setTimeout(() => (showMessage = false), FIVE_SECONDS_IN_MS);
			return () => clearTimeout(timeout);
		}
	});
</script>

<div class="mx-auto max-w-7xl px-4 py-10">
	<h1 class="mb-6 text-2xl font-semibold">Impressionen bearbeiten</h1>

	{#if showMessage && form?.error}
		<p class="mb-4 text-sm text-red-600">{form.error}</p>
	{:else if showMessage && form?.success}
		<p class="mb-4 text-sm text-green-600">{form.success}</p>
	{/if}

	{#if data.media.length === 0}
		<div class="rounded-lg border border-gray-200 bg-white p-10 text-center text-gray-500">
			Keine Impressionen vorhanden.
		</div>
	{:else}
		<div class="mb-6 flex flex-col gap-3 sm:flex-row">
			<input
				type="search"
				bind:value={search}
				placeholder="Nach Titel suchen..."
				aria-label="Impressionen durchsuchen"
				class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none sm:w-1/2"
			/>
			<div class="sm:w-1/2">
				<Dropdown
					bind:value={eventFilter}
					options={filterOptions}
					placeholder="Alle Veranstaltungen"
					searchable
				/>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filtered as medium (medium.id)}
				<div class="flex flex-col gap-3 rounded-lg bg-white p-4 shadow">
					<div
						class="flex aspect-video items-center justify-center overflow-hidden rounded border border-gray-200 bg-gray-50"
					>
						{#if medium.url}
							<img
								src={medium.url}
								alt={medium.title}
								class="h-full w-full object-cover"
							/>
						{:else}
							<span class="text-sm text-gray-400">Kein Bild</span>
						{/if}
					</div>

					<form
						class="flex flex-col gap-3"
						method="POST"
						action="?/update"
						use:enhance={() => {
							submitting = true;
							return ({ update }) => {
								submitting = false;
								return update({ reset: false });
							};
						}}
					>
						<input type="hidden" name="id" value={medium.id} />

						<div class="flex flex-col gap-1">
							<label for={`title-${medium.id}`} class="text-sm font-medium"
								>Titel</label
							>
							<input
								type="text"
								id={`title-${medium.id}`}
								name="title"
								required
								value={medium.title}
								class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
							/>
						</div>

						<div class="flex flex-col gap-1">
							<label for={`description-${medium.id}`} class="text-sm font-medium"
								>Beschreibung</label
							>
							<textarea
								id={`description-${medium.id}`}
								name="description"
								rows="2"
								class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
								>{medium.description ?? ''}</textarea
							>
						</div>

						<div class="flex flex-col gap-1">
							<span class="text-sm font-medium">Veranstaltung</span>
							<Dropdown
								name="event"
								value={medium.eventId === null ? '' : String(medium.eventId)}
								options={eventOptions}
								placeholder="Keine"
								searchable
							/>
						</div>

						<div class="flex gap-3">
							<button
								type="submit"
								disabled={submitting}
								class="grow rounded bg-hcss-primary-700 py-2 text-sm text-white hover:bg-hcss-primary-800 disabled:opacity-50"
							>
								Speichern
							</button>
							<button
								type="submit"
								form={`delete-${medium.id}`}
								disabled={submitting}
								class="rounded border border-red-600 px-3 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white disabled:opacity-50"
							>
								Löschen
							</button>
						</div>
					</form>

					<form
						id={`delete-${medium.id}`}
						method="POST"
						action="?/delete"
						use:enhance={({ cancel }) => {
							if (!confirm(`„${medium.title}“ wirklich löschen?`)) {
								cancel();
								return;
							}
							submitting = true;
							return ({ update }) => {
								submitting = false;
								return update();
							};
						}}
					>
						<input type="hidden" name="id" value={medium.id} />
					</form>
				</div>
			{:else}
				<div
					class="rounded-lg border border-gray-200 bg-white p-10 text-center text-gray-500 sm:col-span-2 lg:col-span-3"
				>
					Keine Treffer.
				</div>
			{/each}
		</div>
	{/if}
</div>
