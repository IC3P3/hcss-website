<script lang="ts">
	import { enhance } from '$app/forms';

	const { data, form } = $props();

	let submitting = $state(false);
	let showMessage = $state(false);
	let selectedId = $state<number | null>(null);
	let search = $state('');
	let showPast = $state(false);

	const FIVE_SECONDS_IN_MS = 5000;
	const nowMs = Date.now();

	const selected = $derived(data.events.find((e) => e.id === selectedId) ?? null);

	function matchesSearch(event: (typeof data.events)[number], q: string): boolean {
		if (!q) return true;
		return [
			event.title,
			event.shortDescription,
			event.description,
			event.address,
			event.songs,
			event.participants
		].some((field) => field?.toLowerCase().includes(q));
	}

	const filtered = $derived.by(() => {
		const q = search.trim().toLowerCase();
		const events = data.events.filter(
			(e) => (showPast ? e.time <= nowMs : e.time > nowMs) && matchesSearch(e, q)
		);
		return showPast ? events : events.toReversed();
	});

	const emptyListMessage = $derived.by(() => {
		if (search.trim()) return 'Keine Treffer.';
		return showPast ? 'Keine vergangenen Veranstaltungen.' : 'Keine kommenden Veranstaltungen.';
	});

	const dateFormat = new Intl.DateTimeFormat('de-DE', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});

	const TWO_DIGITS = 2;

	function toDatetimeLocal(ms: number): string {
		const d = new Date(ms);
		const pad = (n: number) => String(n).padStart(TWO_DIGITS, '0');
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
	}

	$effect(() => {
		if (form) {
			showMessage = true;
			const timeout = setTimeout(() => (showMessage = false), FIVE_SECONDS_IN_MS);
			return () => clearTimeout(timeout);
		}
	});
</script>

<div class="mx-auto max-w-7xl px-4 py-10">
	<h1 class="mb-6 text-2xl font-semibold">Veranstaltungen bearbeiten</h1>

	{#if showMessage && form?.error}
		<p class="mb-4 text-sm text-red-600">{form.error}</p>
	{:else if showMessage && form?.success}
		<p class="mb-4 text-sm text-green-600">{form.success}</p>
	{/if}

	<div class="flex flex-col gap-8 lg:flex-row">
		<div class="flex flex-col gap-3 lg:w-1/3">
			<input
				type="search"
				bind:value={search}
				placeholder="Suchen..."
				aria-label="Veranstaltungen durchsuchen"
				class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
			/>

			<div class="flex rounded-lg border border-gray-200 bg-white p-1">
				<button
					type="button"
					onclick={() => (showPast = false)}
					class="grow rounded-md py-1.5 text-sm transition-colors duration-200 {showPast
						? 'text-gray-600 hover:bg-gray-50'
						: 'bg-hcss-primary-700 text-white'}"
				>
					Kommende
				</button>
				<button
					type="button"
					onclick={() => (showPast = true)}
					class="grow rounded-md py-1.5 text-sm transition-colors duration-200 {showPast
						? 'bg-hcss-primary-700 text-white'
						: 'text-gray-600 hover:bg-gray-50'}"
				>
					Vergangene
				</button>
			</div>

			<ul class="flex flex-col gap-2">
				{#each filtered as event (event.id)}
					<li>
						<button
							type="button"
							onclick={() => (selectedId = event.id)}
							class="w-full rounded-lg border p-4 text-left transition-colors duration-200 {selectedId ===
							event.id
								? 'border-hcss-primary-700 bg-hcss-primary-100'
								: 'border-gray-200 bg-white hover:bg-gray-50'}"
						>
							<span class="block font-medium text-gray-900">{event.title}</span>
							<span class="block text-sm text-gray-600">
								{dateFormat.format(event.time)}
							</span>
						</button>
					</li>
				{:else}
					<li class="rounded-lg border border-gray-200 bg-white p-6 text-gray-500">
						{emptyListMessage}
					</li>
				{/each}
			</ul>
		</div>

		<div class="lg:w-2/3">
			{#if selected}
				{#key selected.id}
					<form
						class="flex flex-col gap-4 rounded-lg bg-white p-6 shadow"
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
						<input type="hidden" name="id" value={selected.id} />

						<div class="flex flex-col gap-1">
							<label for="title" class="text-sm font-medium">Titel</label>
							<input
								type="text"
								id="title"
								name="title"
								required
								value={selected.title}
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
								value={toDatetimeLocal(selected.time)}
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
								value={selected.address}
								class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
							/>
							<p class="text-xs text-gray-500">
								Teile mit Komma trennen, jeder Teil wird als eigene Zeile angezeigt.
							</p>
						</div>

						<div class="flex flex-col gap-1">
							<label for="shortDescription" class="text-sm font-medium"
								>Kurzbeschreibung</label
							>
							<input
								type="text"
								id="shortDescription"
								name="shortDescription"
								value={selected.shortDescription ?? ''}
								class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
							/>
						</div>

						<div class="flex flex-col gap-1">
							<label for="description" class="text-sm font-medium">Beschreibung</label
							>
							<textarea
								id="description"
								name="description"
								rows="4"
								class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
								>{selected.description ?? ''}</textarea
							>
						</div>

						<div class="flex flex-col gap-1">
							<label for="songs" class="text-sm font-medium">Lieder</label>
							<textarea
								id="songs"
								name="songs"
								rows="3"
								class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
								>{selected.songs ?? ''}</textarea
							>
						</div>

						<div class="flex flex-col gap-1">
							<label for="participants" class="text-sm font-medium">Mitwirkende</label
							>
							<textarea
								id="participants"
								name="participants"
								rows="3"
								class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
								>{selected.participants ?? ''}</textarea
							>
						</div>

						<div class="flex gap-4">
							<button
								type="submit"
								disabled={submitting}
								class="grow rounded bg-hcss-primary-700 py-2 text-white hover:bg-hcss-primary-800 disabled:opacity-50"
							>
								{submitting ? 'Speichern...' : 'Speichern'}
							</button>
							<button
								type="submit"
								form="delete-form"
								disabled={submitting}
								class="rounded border border-red-600 px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white disabled:opacity-50"
							>
								Löschen
							</button>
						</div>
					</form>

					<form
						id="delete-form"
						method="POST"
						action="?/delete"
						use:enhance={({ cancel }) => {
							if (!confirm(`„${selected?.title}“ wirklich löschen?`)) {
								cancel();
								return;
							}
							submitting = true;
							return ({ update, result }) => {
								submitting = false;
								if (result.type === 'success') selectedId = null;
								return update();
							};
						}}
					>
						<input type="hidden" name="id" value={selected.id} />
					</form>
				{/key}
			{:else}
				<div
					class="flex h-full min-h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400"
				>
					Veranstaltung zum Bearbeiten auswählen
				</div>
			{/if}
		</div>
	</div>
</div>
