<script lang="ts">
	import { enhance } from '$app/forms';

	const { form } = $props();
	let submitting = $state(false);
</script>

<div class="flex min-h-screen items-center justify-center">
	<form
		class="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-8 shadow"
		action="?/login"
		method="POST"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				submitting = false;
				await update();
			};
		}}
	>
		<h1 class="text-center text-2xl font-semibold">Anmelden</h1>

		{#if form?.success === false}
			<p class="text-center text-sm text-red-600">Benutzername oder Passwort falsch.</p>
		{/if}

		<div class="flex flex-col gap-1">
			<label for="username" class="text-sm font-medium">Benutzername</label>
			<input
				type="text"
				id="username"
				name="username"
				autocomplete="username"
				required
				class="rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
			/>
		</div>

		<div class="flex flex-col gap-1">
			<label for="password" class="text-sm font-medium">Passwort</label>
			<input
				type="password"
				id="password"
				name="password"
				autocomplete="current-password"
				required
				class="rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
			/>
		</div>

		<button
			type="submit"
			disabled={submitting}
			class="rounded bg-blue-700 py-2 text-white hover:bg-blue-800 disabled:opacity-50"
		>
			{submitting ? 'Anmelden...' : 'Anmelden'}
		</button>
	</form>
</div>
