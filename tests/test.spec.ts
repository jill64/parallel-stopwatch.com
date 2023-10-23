import { expect, test } from '@playwright/test'

test('measuring', async ({ page }) => {
  await page.goto('/')

  const timer = page.getByRole('heading', { name: '00:00.00' })

  await expect(timer).toContainText('00:00.00')

  const startButton = page.getByTitle('Start')

  await startButton.click()

  await page.waitForTimeout(100)

  await expect(timer).not.toContainText('00:00.00')

  const stopButton = page.getByTitle('Stop')

  await stopButton.click()

  const stopTime = await timer.textContent()

  if (!stopTime) {
    throw new Error('stopTime is null')
  }

  await page.waitForTimeout(100)

  await expect(timer).toContainText(stopTime)

  const resetButton = page.getByTitle('Reset')

  await resetButton.click()

  await expect(timer).toContainText('00:00.00')

  await page.waitForTimeout(100)

  await expect(timer).toContainText('00:00.00')

  await startButton.click()

  await page.waitForTimeout(100)

  await expect(page.getByText('Record 1')).toBeVisible()

  const addButton = page.getByTitle('Add a record')

  await addButton.click()

  await expect(page.getByText('Record 2')).toBeVisible()

  await addButton.click()

  await expect(page.getByText('Record 3')).toBeVisible()

  await page.getByTitle('Delete Record 2').click()

  await expect(page.getByText('Record 2')).not.toBeVisible()

  await page.getByTitle('Add a lap to Record 1').click()
  await page.getByTitle('Add a lap to Record 3').click()
})

test('export', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: '00:00.00' })).toBeVisible()

  await page.getByRole('button', { name: 'Export as CSV' }).click()

  await expect(page.getByTitle('File name')).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Export', exact: true })
  ).toBeVisible()
})
