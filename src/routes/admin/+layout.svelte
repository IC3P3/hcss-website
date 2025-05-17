<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	const { children }: Props = $props();
</script>

<svelte:head>
	<title>HCSS - Administration</title>
</svelte:head>

{@render children?.()}
