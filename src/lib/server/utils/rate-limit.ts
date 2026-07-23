export interface RateLimiter {
	isLimited(key: string): boolean;
	registerFailure(key: string): void;
	reset(key: string): void;
}

// In-memory sliding-window failure counter
export function createRateLimiter(maxAttempts: number, windowMs: number): RateLimiter {
	const attempts = new Map<string, { count: number; windowStart: number }>();

	function prune(now: number) {
		for (const [key, entry] of attempts) {
			if (entry.windowStart + windowMs <= now) attempts.delete(key);
		}
	}

	return {
		isLimited(key: string): boolean {
			prune(Date.now());
			const entry = attempts.get(key);
			return entry !== undefined && entry.count >= maxAttempts;
		},
		registerFailure(key: string) {
			const now = Date.now();
			const entry = attempts.get(key);
			if (entry && entry.windowStart + windowMs > now) {
				entry.count += 1;
			} else {
				attempts.set(key, { count: 1, windowStart: now });
			}
		},
		reset(key: string) {
			attempts.delete(key);
		}
	};
}
