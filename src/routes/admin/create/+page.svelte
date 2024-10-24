<h1>Einträge hinzufügen</h1>

<h2>Veranstaltung hinzufügen</h2>
<form method="POST" enctype="multipart/form-data">
	<label>
		Titel
		<input name="title" type="text" />
	</label>
	<label>
		Untertitel
		<input name="subtitle" type="text" />
	</label>
	<label>
		Adresse
		<input name="address" type="text" />
	</label>
	<label>
		Uhrzeit
		<input name="time" type="datetime-local" />
	</label>
	<button type="submit" formaction="?/createEvent">Veranstaltung erstellen</button>
</form>
