<script lang="ts" module>
	export const UNSAVED_MESSAGE = 'Es gibt ungespeicherte Änderungen. Trotzdem fortfahren?';
</script>

<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import ConfirmDialog from './ConfirmDialog.svelte';

	interface Props {
		when: boolean;
	}

	const { when }: Props = $props();

	let open = $state(false);
	let target: string | null = null;

	// Tab close/reload (`leave`) can only show the browser's native prompt, so it
	// is cancelled outright; in-app navigation gets the styled dialog instead.
	beforeNavigate((nav) => {
		if (!when) return;
		nav.cancel();
		if (nav.type === 'leave') return;
		target = nav.to?.url.href ?? null;
		open = true;
	});

	function leave() {
		// Full page load on purpose: dirty state is being discarded anyway.
		if (target) location.href = target;
	}
</script>

<ConfirmDialog bind:open message={UNSAVED_MESSAGE} confirmLabel="Verlassen" onconfirm={leave} />
