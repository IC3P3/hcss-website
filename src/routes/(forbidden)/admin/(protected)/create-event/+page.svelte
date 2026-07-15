<script lang="ts">
	const { form }: { form?: { error?: string; success?: string } } = $props();

	const showMessage = $derived(Boolean(form));
</script>

<div class="mx-auto max-w-7xl px-4 py-10">
	<div class="flex gap-8">
		<form action="POST" class="flex w-1/2 flex-col gap-4 p-8">
			<h1 class="2xl font-semibold">Veranstaltung erstellen</h1>

			{#if showMessage && form?.error}
				<p class="text-sm text-red-600">{form?.error}</p>
			{:else if showMessage && form?.success}
				<p class="text-sm text-green-600">{form?.success}</p>
			{/if}

			<div class="flex flex-col gpa-1">
				<label for="title" class="text-sm font-medium">Titel</label>
				<input
					type="text"
					id="title"
					name="title"
					required
					class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700"
				/>
			</div>
		</form>
	</div>
</div>
