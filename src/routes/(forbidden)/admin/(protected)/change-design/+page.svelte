<script lang="ts">
	import { enhance } from '$app/forms';
	import { SvelteMap } from 'svelte/reactivity';
	import Dropdown, { type DropdownOption } from '$lib/components/ui/Dropdown.svelte';

	const { data, form } = $props();

	const FIVE_SECONDS_IN_MS = 5000;
	const UNASSIGNED_EVENT = 'Ohne Veranstaltung';

	const SECTION_LABELS: Record<string, string> = {
		hero: 'Hero-Bild',
		media: 'Galerie',
		offer: 'Angebote'
	};

	function sectionOf(tag: string): string {
		if (tag.startsWith('offer-')) return SECTION_LABELS.offer;
		return SECTION_LABELS[tag] ?? 'Sonstige';
	}

	let submitting = $state(false);
	let showMessage = $state(false);

	// Seeded once from the saved slot/media mapping; each Dropdown's bind:value mutates an
	// entry, so this must be a $state proxy for those member writes to stay reactive.
	// svelte-ignore state_referenced_locally
	const selected = $state<Record<number, string>>(
		Object.fromEntries(
			data.slots.map((s) => [s.id, s.mediaId == null ? '' : String(s.mediaId)])
		)
	);

	const mediaById = $derived(new Map(data.media.map((m) => [String(m.id), m])));

	const mediaOptions = $derived<DropdownOption[]>(
		data.media.map((m) => ({
			value: String(m.id),
			label: m.title,
			group: m.eventTitle ?? UNASSIGNED_EVENT
		}))
	);

	const groups = $derived.by(() => {
		const map = new SvelteMap<string, (typeof data.slots)[number][]>();
		for (const slot of data.slots) {
			const name = sectionOf(slot.tag);
			if (!map.has(name)) map.set(name, []);
			map.get(name)!.push(slot);
		}
		return [...map.entries()].map(([name, slots]) => ({ name, slots }));
	});

	const dirty = $derived(
		data.slots.some((s) => selected[s.id] !== (s.mediaId == null ? '' : String(s.mediaId)))
	);

	$effect(() => {
		if (form) {
			showMessage = true;
			const timeout = setTimeout(() => (showMessage = false), FIVE_SECONDS_IN_MS);
			return () => clearTimeout(timeout);
		}
	});
</script>

<form
	class="mx-auto max-w-7xl px-4 py-10"
	method="POST"
	use:enhance={() => {
		submitting = true;
		return async ({ update }) => {
			submitting = false;
			await update({ reset: false });
		};
	}}
>
	<div class="mb-8 flex items-center justify-between gap-4">
		<h1 class="text-3xl font-bold text-blue-950">Erscheinungsbild</h1>

		{#if showMessage && form?.error}
			<p class="ml-auto text-sm text-red-600">{form.error}</p>
		{:else if showMessage && form?.success}
			<p class="ml-auto text-sm text-green-600">{form.success}</p>
		{:else if dirty}
			<p class="ml-auto text-sm text-amber-600">Ungespeicherte Änderungen.</p>
		{/if}

		<button
			type="submit"
			disabled={submitting || !dirty}
			class="rounded bg-blue-700 px-6 py-2 text-white hover:bg-blue-800 disabled:opacity-50"
		>
			{submitting ? 'Speichern...' : 'Speichern'}
		</button>
	</div>

	<div class="flex flex-col gap-10">
		{#each groups as group (group.name)}
			<section>
				<h2 class="mb-4 text-xl font-semibold text-gray-900">{group.name}</h2>
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each group.slots as slot (slot.id)}
						{@const url = selected[slot.id]
							? mediaById.get(selected[slot.id])?.url
							: null}
						<div class="flex flex-col gap-3 rounded-lg bg-white p-4 shadow">
							<span class="text-sm font-medium text-gray-700"
								>{slot.title ?? slot.tag}</span
							>

							<div
								class="flex aspect-video items-center justify-center overflow-hidden rounded border border-dashed border-gray-300 bg-gray-50"
							>
								{#if url}
									<img
										src={url}
										alt={slot.title ?? slot.tag}
										class="h-full w-full object-cover"
									/>
								{:else}
									<span class="text-sm text-gray-400">Kein Bild</span>
								{/if}
							</div>

							<Dropdown
								name={`slot-${slot.id}`}
								bind:value={selected[slot.id]}
								options={mediaOptions}
								placeholder="Kein Bild"
								searchable
							/>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</form>
