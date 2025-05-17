<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form action="?/login" method="POST" use:enhance>
	<div>
		<label for="username">Benutzername</label>
		<input type="text" id="username" name="username" required />
	</div>

	<div>
		<label for="password">Passwort</label>
		<input type="password" id="password" name="password" required />
	</div>

	<button type="submit">Anmelden</button>
</form>
