<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<div class="mx-auto max-w-5xl px-4 py-10">
	<h1 class="mb-8 text-3xl font-bold text-hcss-primary-950">Administrationsbereich</h1>
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		<div class="flex flex-col gap-2 rounded-lg bg-white p-6 shadow">
			<h2 class="mb-4 text-xl font-semibold text-gray-900">Medien</h2>
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
			<h2 class="mb-4 text-xl font-semibold text-gray-900">Veranstaltungen</h2>
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
			<h2 class="mb-4 text-xl font-semibold text-gray-900">Erscheinungsbild</h2>
			<a
				class="rounded border border-hcss-primary-700 px-4 py-2 text-center text-sm text-hcss-primary-700 transition-colors duration-200 hover:bg-hcss-primary-700 hover:text-white"
				href={resolve('/admin/change-design')}>Design-Elemente bearbeiten</a
			>
		</div>
	</div>
</div>
