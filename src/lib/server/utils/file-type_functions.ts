/* eslint-disable no-magic-numbers */
// WebP is a RIFF container: "RIFF" at bytes 0–4, file size at 4–8, "WEBP" at
// 8–12. Both markers present identifies the format from its magic bytes.
export function isWebP(buffer: Buffer): boolean {
	return (
		buffer.length >= 12 &&
		buffer.toString('ascii', 0, 4) === 'RIFF' &&
		buffer.toString('ascii', 8, 12) === 'WEBP'
	);
}
