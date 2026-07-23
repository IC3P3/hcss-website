<script lang="ts">
	interface Props {
		form: { error?: string; success?: string } | null | undefined;
	}

	const { form }: Props = $props();

	const FIVE_SECONDS_IN_MS = 5000;

	let visible = $state(false);

	$effect(() => {
		if (form) {
			visible = true;
			const timeout = setTimeout(() => (visible = false), FIVE_SECONDS_IN_MS);
			return () => clearTimeout(timeout);
		}
	});
</script>

{#if visible && form?.error}
	<div
		role="alert"
		class="fixed right-4 bottom-4 z-50 rounded-lg bg-red-600 px-4 py-3 text-sm text-white shadow-lg"
	>
		{form.error}
	</div>
{:else if visible && form?.success}
	<div
		role="status"
		class="fixed right-4 bottom-4 z-50 rounded-lg bg-green-600 px-4 py-3 text-sm text-white shadow-lg"
	>
		{form.success}
	</div>
{/if}
