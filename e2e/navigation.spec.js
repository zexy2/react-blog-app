/**
 * E2E Test: Navigation
 */

import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');

    // Navigate to bookmarks
    await page.click('a[href*="bookmarks"]');
    await expect(page).toHaveURL(/\/bookmarks/);

    // Navigate to analytics
    await page.click('a[href*="analytics"]');
    await expect(page).toHaveURL(/\/analytics/);

    // Navigate back to home
    await page.click('a[href="/react-blog-app/"]');
    await expect(page).toHaveURL(/\/react-blog-app\/$/);
  });

  test('should show 404 for unknown routes', async ({ page }) => {
    await page.goto('/unknown-page');
    
    await expect(page.getByText('404')).toBeVisible();
  });

  test('should have responsive navigation on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Header should still be visible
    await expect(page.locator('header')).toBeVisible();
  });
});
