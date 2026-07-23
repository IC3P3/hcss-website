<script lang="ts">
	import { enhance } from '$app/forms';
	import Dropdown, { type DropdownOption } from '$lib/components/ui/Dropdown.svelte';
	import LeaveGuard from '$lib/components/ui/LeaveGuard.svelte';
	import Toast from '$lib/components/ui/Toast.svelte';

	const { data, form } = $props();

	let submitting = $state(false);
	let previewImg = $state<string | null>(null);
	let selectedEvent = $state('');
	let dirty = $state(false);

	const dateFormat = new Intl.DateTimeFormat('de-DE', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});

	const eventOptions = $derived<DropdownOption[]>(
		data.events.map((e) => ({
			value: String(e.id),
			label: e.date ? `${e.title} - ${dateFormat.format(e.date)}` : e.title
		}))
	);

	function onFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];

		if (previewImg) URL.revokeObjectURL(previewImg);

		if (file) {
			previewImg = URL.createObjectURL(file);
		} else {
			previewImg = null;
		}
	}
</script>

<LeaveGuard when={dirty} />
<Toast {form} />

<div class="mx-auto max-w-7xl px-4 py-10">
	<div class="flex flex-col gap-8 lg:flex-row">
		<form
			class="flex w-full flex-col gap-4 p-8 lg:w-1/2"
			method="POST"
			enctype="multipart/form-data"
			oninput={() => (dirty = true)}
			use:enhance={() => {
				submitting = true;
				return ({ update, result }) => {
					submitting = false;
					if (result.type === 'success') {
						previewImg = null;
						selectedEvent = '';
						dirty = false;
					}
					return update({ reset: result.type === 'success' });
				};
			}}
		>
			<h1 class="text-2xl font-semibold">Impression erstellen</h1>

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
				<label for="description" class="text-sm font-medium">Beschreibung</label>
				<textarea
					id="description"
					name="description"
					class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
				></textarea>
			</div>

			<div class="flex flex-col gap-1">
				<label for="media" class="text-sm font-medium">Bild (WebP)</label>
				<input
					type="file"
					onchange={onFileChange}
					id="media"
					name="media"
					accept="image/*"
					required
					class="rounded border px-3 py-2"
				/>
			</div>

			<div class="flex flex-col gap-1">
				<span class="text-sm font-medium">Veranstaltung</span>
				<Dropdown
					name="event"
					bind:value={selectedEvent}
					options={eventOptions}
					placeholder="Keine"
					searchable
					onchange={() => (dirty = true)}
				/>
			</div>

			<button
				type="submit"
				disabled={submitting}
				class="rounded bg-hcss-primary-700 py-2 text-white hover:bg-hcss-primary-800 disabled:opacity-50"
			>
				{submitting ? 'Erstellen...' : 'Erstellen'}
			</button>
		</form>

		<div
			class="flex min-h-64 w-full items-center justify-center self-stretch rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 lg:min-h-0 lg:w-1/2"
		>
			{#if previewImg}
				<img
					src={previewImg}
					alt="Vorschau"
					class="max-h-[80vh] w-full rounded-lg object-contain"
				/>
			{:else}
				<div class="flex flex-col items-center gap-3 text-gray-400">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-16 w-16"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<span class="text-sm">Vorschau</span>
				</div>
			{/if}
		</div>
	</div>
</div>
