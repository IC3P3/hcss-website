<h1>Einträge hinzufügen</h1>

<h2>Veranstaltung hinzufügen</h2>
<form method="POST">
	<label>
		Titel
		<input name="title" type="text" required />
	</label>
	<label>
		Untertitel
		<input name="subtitle" type="text" />
	</label>
	<label>
		Adresse
		<input name="address" type="text" required />
	</label>
	<label>
		Uhrzeit
		<input name="time" type="datetime-local" required />
	</label>
	<button type="submit" formaction="?/createEvent">Veranstaltung erstellen</button>
</form>
