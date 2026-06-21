import { defineConfig } from '@playwright/test';

const DB_FILE = process.env.DATABASE_URL ?? 'e2e-test.db';

const setup = [
	'pnpm dlx tsx scripts/migrate.ts',
	'pnpm dlx tsx scripts/seed.ts',
	'pnpm preview --port 4173'
];
if (!process.env.CI) setup.unshift('pnpm build');

export default defineConfig({
	testDir: 'e2e',
	use: { baseURL: 'http://localhost:4173' },
	webServer: {
		command: setup.join(' && '),
		port: 4173,
		reuseExistingServer: !process.env.CI,
		env: {
			DATABASE_URL: DB_FILE,
			HOST_URL: 'http://localhost:4173',
			UPLOAD_PATH: 'upload',
			ADMIN_USERNAME: 'admin',
			ADMIN_PASSWORD: 'e2e-test-password'
		}
	}
});
