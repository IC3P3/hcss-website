import { describe, expect, it } from 'vitest';
import { MEDIA_URL_BASE, mediaUrl } from './media';

describe('mediaUrl', () => {
	it('builds an encoded URL under the media base', () => {
		expect(mediaUrl('summer concert.jpg')).toBe(`${MEDIA_URL_BASE}/summer%20concert.jpg`);
	});

	it('returns null for null, undefined, and empty input', () => {
		expect(mediaUrl(null)).toBeNull();
		expect(mediaUrl(undefined)).toBeNull();
		expect(mediaUrl('')).toBeNull();
	});
});
