<script lang="ts">
	import { enhance } from '$app/forms';
	import Toast from '$lib/components/ui/Toast.svelte';
	import ConfirmDialog from '$lib/components/ui/ConfirmDialog.svelte';

	const { data, form } = $props();

	let submitting = $state('');
	let confirmDeleteOpen = $state(false);
	let pendingDelete = $state<{ id: number; username: string } | null>(null);
	let deleteForm = $state<HTMLFormElement>();

	function submit(name: string) {
		submitting = name;
		return ({
			update,
			result
		}: {
			update: (o?: { reset?: boolean }) => Promise<void>;
			result: { type: string };
		}) => {
			submitting = '';
			return update({ reset: result.type === 'success' });
		};
	}
</script>

<Toast {form} />

<div class="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10">
	<h1 class="text-3xl font-bold text-hcss-primary-950">Administratoren</h1>

	<section class="flex flex-col gap-4 rounded-lg bg-white p-8 shadow">
		<h2 class="text-xl font-semibold">Ihr Konto</h2>

		<form
			class="flex flex-col gap-4"
			method="POST"
			action="?/changeUsername"
			use:enhance={() => submit('changeUsername')}
		>
			<div class="flex flex-col gap-1">
				<label for="username" class="text-sm font-medium">Benutzername</label>
				<input
					type="text"
					id="username"
					name="username"
					required
					value={data.currentUsername}
					class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
				/>
			</div>
			<button
				type="submit"
				disabled={submitting === 'changeUsername'}
				class="self-start rounded bg-hcss-primary-700 px-4 py-2 text-white hover:bg-hcss-primary-800 disabled:opacity-50"
			>
				Benutzername speichern
			</button>
		</form>

		<hr class="border-gray-200" />

		<form
			class="flex flex-col gap-4"
			method="POST"
			action="?/changePassword"
			use:enhance={() => submit('changePassword')}
		>
			<div class="flex flex-col gap-1">
				<label for="currentPassword" class="text-sm font-medium">Aktuelles Passwort</label>
				<input
					type="password"
					id="currentPassword"
					name="currentPassword"
					required
					autocomplete="current-password"
					class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
				/>
			</div>
			<div class="flex flex-col gap-1">
				<label for="newPassword" class="text-sm font-medium">Neues Passwort</label>
				<input
					type="password"
					id="newPassword"
					name="newPassword"
					required
					minlength="8"
					autocomplete="new-password"
					class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
				/>
			</div>
			<button
				type="submit"
				disabled={submitting === 'changePassword'}
				class="self-start rounded bg-hcss-primary-700 px-4 py-2 text-white hover:bg-hcss-primary-800 disabled:opacity-50"
			>
				Passwort ändern
			</button>
		</form>
	</section>

	<section class="flex flex-col gap-4 rounded-lg bg-white p-8 shadow">
		<h2 class="text-xl font-semibold">Neuen Administrator hinzufügen</h2>

		<form
			class="flex flex-col gap-4"
			method="POST"
			action="?/createAdmin"
			use:enhance={() => submit('createAdmin')}
		>
			<div class="flex flex-col gap-1">
				<label for="new-username" class="text-sm font-medium">Benutzername</label>
				<input
					type="text"
					id="new-username"
					name="username"
					required
					autocomplete="off"
					class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
				/>
			</div>
			<div class="flex flex-col gap-1">
				<label for="new-password" class="text-sm font-medium">Passwort</label>
				<input
					type="password"
					id="new-password"
					name="password"
					required
					minlength="8"
					autocomplete="new-password"
					class="rounded border px-3 py-2 focus:ring-2 focus:ring-hcss-primary-700 focus:outline-none"
				/>
			</div>
			<button
				type="submit"
				disabled={submitting === 'createAdmin'}
				class="self-start rounded bg-hcss-primary-700 px-4 py-2 text-white hover:bg-hcss-primary-800 disabled:opacity-50"
			>
				Administrator anlegen
			</button>
		</form>

		<ul class="flex flex-col gap-1 text-sm text-gray-700">
			{#each data.admins as admin (admin.id)}
				<li class="flex items-center justify-between border-b border-gray-100 py-1">
					<span>{admin.username}{admin.id === data.currentUserId ? ' (Sie)' : ''}</span>
					{#if admin.id !== data.currentUserId}
						<button
							type="button"
							onclick={() => {
								pendingDelete = { id: admin.id, username: admin.username };
								confirmDeleteOpen = true;
							}}
							disabled={submitting === 'deleteAdmin'}
							class="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
						>
							Löschen
						</button>
					{/if}
				</li>
			{/each}
		</ul>

		<form
			bind:this={deleteForm}
			method="POST"
			action="?/deleteAdmin"
			use:enhance={() => {
				const cb = submit('deleteAdmin');
				return async (event) => {
					if (event.result.type === 'success') pendingDelete = null;
					await cb(event);
				};
			}}
		>
			<input type="hidden" name="id" value={pendingDelete?.id ?? ''} />
		</form>
	</section>
</div>

<ConfirmDialog
	bind:open={confirmDeleteOpen}
	message={`Administrator „${pendingDelete?.username ?? ''}“ wirklich löschen?`}
	confirmLabel="Löschen"
	onconfirm={() => deleteForm?.requestSubmit()}
/>
