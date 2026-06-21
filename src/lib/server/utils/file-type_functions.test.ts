import { describe, expect, it } from 'vitest';
import { isWebP } from './file-type_functions';

describe('isWebP', () => {
	it('accepts a buffer with RIFF/WEBP magic bytes', () => {
		const buffer = Buffer.concat([
			Buffer.from('RIFF', 'ascii'),
			Buffer.from([0, 0, 0, 0]),
			Buffer.from('WEBP', 'ascii')
		]);
		expect(isWebP(buffer)).toBe(true);
	});

	it('rejects a non-WebP buffer', () => {
		expect(isWebP(Buffer.from('not an image at all'))).toBe(false);
	});

	it('rejects a buffer shorter than the 12-byte header', () => {
		expect(isWebP(Buffer.from('RIFF'))).toBe(false);
	});
});
