export function escapeXML(input: string): string {
	return (
		input
			// & must be replaced first, or the entities added below get double-escaped.
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&apos;')
	);
}
