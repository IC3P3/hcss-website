import { expect, test } from '@playwright/test';

test('homepage renders', async ({ page }) => {
	const response = await page.goto('/');
	expect(response?.status()).toBe(200);
	await expect(page.locator('body')).toBeVisible();
});

test('login with valid credentials reaches the admin dashboard', async ({ page }) => {
	await page.goto('/admin/login');
	await page.fill('input[name="username"]', 'admin');
	await page.fill('input[name="password"]', 'e2e-test-password');
	await page.click('button[type="submit"]');

	await page.waitForURL('**/admin');
	expect(new URL(page.url()).pathname).toBe('/admin');
});

test('login with invalid credentials shows an error', async ({ page }) => {
	await page.goto('/admin/login');
	await page.fill('input[name="username"]', 'admin');
	await page.fill('input[name="password"]', 'definitely-wrong');
	await page.click('button[type="submit"]');

	await expect(page.getByText('Benutzername oder Passwort falsch.')).toBeVisible();
});
