import { describe, expect, it } from 'vitest';
import { escapeXML } from './xml_functions';

describe('escapeXML', () => {
	it('escapes all five XML entities', () => {
		expect(escapeXML(`<a href="x" id='y'> & </a>`)).toBe(
			'&lt;a href=&quot;x&quot; id=&apos;y&apos;&gt; &amp; &lt;/a&gt;'
		);
	});

	it('escapes ampersands first so entities are not double-escaped', () => {
		expect(escapeXML('<')).toBe('&lt;');
		expect(escapeXML('&lt;')).toBe('&amp;lt;');
	});
});
