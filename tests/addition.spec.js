// @ts-check

const { test, expect } = require('@playwright/test');
const { googlePage } = require('./support/pageobjectmodel/pages/google.page');

test.afterEach(async ({ page }) => {
    await page.getByText('AC', { exact: true }).click();
})

//Tests to verify addition functionality
const num = [1,2,3,4,5,6,7,8,9,0];

for (const n of num) {
    test(`should add ${n} to ${n}`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        await google.searchFor("calculator");
        await page.getByRole('button', { name: `${n}` }).click();
        await page.getByText('+').click();
        await page.getByRole('button', { name: `${n}` }).click();
        await page.getByLabel('equals').click();
        await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${n + n}`);
    });
}

test('should match non matching numbers', async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByRole('button', { name: '1' }).click();
    await page.getByText('+').click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByLabel('equals').click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('3');
});