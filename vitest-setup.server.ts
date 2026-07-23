import { vi } from 'vitest';
import { env } from 'node:process';

// Kit's vite plugin feeds $env/dynamic/private from .env, bypassing vitest's
// `test.env` override. Without this mock, tests would hit the dev database.
vi.mock('$env/dynamic/private', () => ({ env }));
