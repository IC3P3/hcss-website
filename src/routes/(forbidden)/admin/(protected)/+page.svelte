<script lang="ts">
	import { resolve } from '$app/paths';

	const { data } = $props();

	const stats = $derived(data.stats);

	const dateFormat = new Intl.DateTimeFormat('de-DE', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});
</script>

<div class="mx-auto max-w-5xl px-4 py-10">
	<h1 class="mb-8 text-3xl font-bold text-hcss-primary-950">Administrationsbereich</h1>
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		<div class="flex flex-col gap-2 rounded-lg bg-white p-6 shadow">
			<h2 class="text-xl font-semibold text-gray-900">Medien</h2>
			<p class="mb-4 grow text-sm text-gray-500">
				{stats.mediaTotal}
				{stats.mediaTotal === 1 ? 'Impression' : 'Impressionen'}{stats.mediaUnassigned > 0
					? ` · ${stats.mediaUnassigned} ohne Veranstaltung`
					: ''}
			</p>
			<a
				class="rounded bg-hcss-primary-700 py-2 text-center text-sm text-white transition-colors duration-200 hover:bg-hcss-primary-800"
				href={resolve('/admin/create-media')}>Impression hinzufügen</a
			>
			<a
				class="rounded border border-hcss-primary-700 px-4 py-2 text-center text-sm text-hcss-primary-700 transition-colors duration-200 hover:bg-hcss-primary-700 hover:text-white"
				href={resolve('/admin/change-media')}>Impression bearbeiten</a
			>
		</div>
		<div class="flex flex-col gap-2 rounded-lg bg-white p-6 shadow">
			<h2 class="text-xl font-semibold text-gray-900">Veranstaltungen</h2>
			<p class="mb-4 grow text-sm text-gray-500">
				{stats.eventsUpcoming} kommende · {stats.eventsPast} vergangene
				{#if stats.nextEvent}
					<span class="block">
						Nächste: {dateFormat.format(stats.nextEvent.time)} – {stats.nextEvent.title}
					</span>
				{/if}
			</p>
			<a
				class="rounded bg-hcss-primary-700 py-2 text-center text-sm text-white transition-colors duration-200 hover:bg-hcss-primary-800"
				href={resolve('/admin/create-event')}>Veranstaltungen erstellen</a
			>
			<a
				class="rounded border border-hcss-primary-700 px-4 py-2 text-center text-sm text-hcss-primary-700 transition-colors duration-200 hover:bg-hcss-primary-700 hover:text-white"
				href={resolve('/admin/change-event')}>Veranstaltungen bearbeiten</a
			>
		</div>
		<div class="flex flex-col gap-2 rounded-lg bg-white p-6 shadow">
			<h2 class="text-xl font-semibold text-gray-900">Erscheinungsbild</h2>
			<p class="mb-4 grow text-sm text-gray-500">
				{stats.slotsFilled} von {stats.slotsTotal} Slots belegt
			</p>
			<a
				class="rounded border border-hcss-primary-700 px-4 py-2 text-center text-sm text-hcss-primary-700 transition-colors duration-200 hover:bg-hcss-primary-700 hover:text-white"
				href={resolve('/admin/change-design')}>Design-Elemente bearbeiten</a
			>
		</div>
	</div>
</div>
