import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRateLimiter } from './rate-limit';

const MAX_ATTEMPTS = 3;
const WINDOW_MS = 1000;

beforeEach(() => {
	vi.useFakeTimers();
});

afterEach(() => {
	vi.useRealTimers();
});

describe('createRateLimiter', () => {
	it('is not limited before reaching max attempts', () => {
		const limiter = createRateLimiter(MAX_ATTEMPTS, WINDOW_MS);
		limiter.registerFailure('a');
		limiter.registerFailure('a');
		expect(limiter.isLimited('a')).toBe(false);
	});

	it('limits after max attempts', () => {
		const limiter = createRateLimiter(MAX_ATTEMPTS, WINDOW_MS);
		for (let i = 0; i < MAX_ATTEMPTS; i++) {
			limiter.registerFailure('a');
		}
		expect(limiter.isLimited('a')).toBe(true);
	});

	it('tracks keys independently', () => {
		const limiter = createRateLimiter(MAX_ATTEMPTS, WINDOW_MS);
		for (let i = 0; i < MAX_ATTEMPTS; i++) {
			limiter.registerFailure('a');
		}
		expect(limiter.isLimited('b')).toBe(false);
	});

	it('unlimits after the window expires', () => {
		const limiter = createRateLimiter(MAX_ATTEMPTS, WINDOW_MS);
		for (let i = 0; i < MAX_ATTEMPTS; i++) {
			limiter.registerFailure('a');
		}
		vi.advanceTimersByTime(WINDOW_MS + 1);
		expect(limiter.isLimited('a')).toBe(false);
	});

	it('reset clears the counter', () => {
		const limiter = createRateLimiter(MAX_ATTEMPTS, WINDOW_MS);
		for (let i = 0; i < MAX_ATTEMPTS; i++) {
			limiter.registerFailure('a');
		}
		limiter.reset('a');
		expect(limiter.isLimited('a')).toBe(false);
	});
});
