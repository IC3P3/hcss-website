/* eslint-disable no-magic-numbers */
export function isWebP(buffer: Buffer): boolean {
	return (
		buffer.length >= 12 &&
		buffer.toString('ascii', 0, 4) === 'RIFF' &&
		buffer.toString('ascii', 8, 12) === 'WEBP'
	);
}
