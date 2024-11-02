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

<h2>Bilder hinzufügen</h2>
<form method="POST" action="?/addImage" enctype="multipart/form-data">
	<label>
		Image
		<input name="image" type="file" accept="image/webp" required />
	</label>
	<label>
		Untertitel
		<input name="subtitle" type="text" />
	</label>

	<!-- TODO: Make a dropdown with every currently added Events by name -->
	<label>
		Veranstaltung
		<input name="event_id" type="number" required />
	</label>

	<button type="submit">Bild hinzufügen</button>
</form>
