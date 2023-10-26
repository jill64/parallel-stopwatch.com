import { expect, test } from '@playwright/test'

test('export', async ({ page }) => {
  await page.goto('/')

  const timer = page.getByRole('heading', { name: 'Time' })

  await expect(timer).toHaveText('00:00.00')

  await page.getByRole('button', { name: 'Export as CSV' }).click()

  await expect(page.getByRole('textbox', { name: 'File name' })).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Export', exact: true })
  ).toBeVisible()
})
