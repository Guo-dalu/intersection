import { expect, test } from '@playwright/test'

test('index page has expected heading', async ({ page }) => {
	await page.goto('/')
	await expect(
		page.getByRole('heading', { name: 'Compute the Intersection of Collection A and Collection B' })
	).toBeVisible()
})

test('index page has two input components', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByLabel('Size of collection A')).toBeVisible()
	await expect(page.getByLabel('Size of collection B')).toBeVisible()
})

test('index page can run the intersection computation', async ({ page }) => {
	await page.goto('/')
	await page.getByLabel('Size of collection A').fill('220')
	await page.getByLabel('Size of collection B').fill('100')
	await page.getByRole('radio', { name: 'Collection B' }).check()
	await page.getByRole('button', { name: 'run' }).click()
	await expect(page.getByText('the result would be')).toBeVisible()
})
