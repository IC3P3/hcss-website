<script lang="ts">
	interface Props {
		open: boolean;
		message: string;
		confirmLabel?: string;
		cancelLabel?: string;
		onconfirm: () => void;
	}

	let {
		open = $bindable(),
		message,
		confirmLabel = 'Bestätigen',
		cancelLabel = 'Abbrechen',
		onconfirm
	}: Props = $props();

	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		if (open) dialog?.showModal();
		else dialog?.close();
	});

	function handleConfirm() {
		open = false;
		onconfirm();
	}
</script>

<dialog
	bind:this={dialog}
	onclose={() => (open = false)}
	class="m-auto w-full max-w-sm rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50"
>
	<p class="text-gray-900">{message}</p>
	<div class="mt-6 flex justify-end gap-3">
		<button
			type="button"
			onclick={() => (open = false)}
			class="rounded border border-gray-300 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
		>
			{cancelLabel}
		</button>
		<button
			type="button"
			onclick={handleConfirm}
			class="rounded bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700"
		>
			{confirmLabel}
		</button>
	</div>
</dialog>
