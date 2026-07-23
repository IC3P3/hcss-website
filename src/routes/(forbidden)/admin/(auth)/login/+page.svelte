<script lang="ts">
	import { enhance } from '$app/forms';

	const { form } = $props();
	let submitting = $state(false);
	let showMessage = $state(false);
	let showPassword = $state(false);

	const FIVE_SECONDS_IN_MS = 5000;

	$effect(() => {
		if (form) {
			showMessage = true;
			const timeout = setTimeout(() => (showMessage = false), FIVE_SECONDS_IN_MS);
			return () => clearTimeout(timeout);
		}
	});
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

		{#if showMessage && form?.error}
			<p class="text-center text-sm text-red-600">{form.error}</p>
		{:else if showMessage && form?.success === false}
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
				class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
			/>
		</div>

		<div class="flex flex-col gap-1">
			<label for="password" class="text-sm font-medium">Passwort</label>
			<div class="relative">
				<input
					type={showPassword ? 'text' : 'password'}
					id="password"
					name="password"
					autocomplete="current-password"
					required
					class="w-full rounded border px-3 py-2 pr-10 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
				/>
				<button
					type="button"
					onclick={() => (showPassword = !showPassword)}
					aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
					aria-pressed={showPassword}
					class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
				>
					{#if showPassword}
						<svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
							/>
						</svg>
					{:else}
						<svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<button
			type="submit"
			disabled={submitting}
			class="rounded bg-hcss-primary-700 py-2 text-white hover:bg-hcss-primary-800 disabled:opacity-50"
		>
			{submitting ? 'Anmelden...' : 'Anmelden'}
		</button>
	</form>
</div>
