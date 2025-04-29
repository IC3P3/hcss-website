<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>HCSS - Administration</title>
</svelte:head>

{@render children?.()}
