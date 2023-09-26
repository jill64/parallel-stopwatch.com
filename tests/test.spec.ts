import { expect, test } from '@playwright/test'

test('index page has expected h1', async ({ page }) => {
  await page.goto('/parallel-stopwatch')
  await expect(page.getByRole('heading', { name: '00:00.00' })).toBeVisible()
})
