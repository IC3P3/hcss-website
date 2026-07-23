import { randomBytes } from 'node:crypto';

const SESSION_TOKEN_BYTES = 32;

/** 256-bit random session token, base64url encoded. */
export function generateSessionToken(): string {
	return randomBytes(SESSION_TOKEN_BYTES).toString('base64url');
}
