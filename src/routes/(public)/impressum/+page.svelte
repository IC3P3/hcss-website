<script lang="ts">
	import { page } from '$app/state';
	import LegalPage from '$lib/components/layout/LegalPage.svelte';

	const TITLE = 'Impressum';
</script>

<svelte:head>
	<title>{TITLE} – Helmstedter Chor- und Singschule</title>
	<meta name="robots" content="noindex" />
	<meta property="og:title" content={TITLE} />
	<meta property="og:url" content={page.url.href} />
</svelte:head>

<LegalPage title={TITLE}>
	<h2>Angaben gemäß § 5 DDG</h2>
	<p>
		Helmstedter Chor- und Singschule e.V.<br />
		Klosterstr. 12<br />
		38350 Helmstedt
	</p>

	<p>
		Vereinsregister: VR 130345<br />
		Registergericht: Braunschweig
	</p>

	<p>
		<strong>Vertreten durch:</strong><br />
		Stefan PD Runge (1. Vorsitzender)
	</p>

	<h2>Kontakt</h2>
	<p>E-Mail: <a href="mailto:HCSS38350@gmx.de">HCSS38350@gmx.de</a></p>

	<h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
	<p>
		Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
		Verbraucherschlichtungsstelle teilzunehmen.
	</p>

	<p>Quelle: <a href="https://www.e-recht24.de">e-recht24.de</a></p>
</LegalPage>
