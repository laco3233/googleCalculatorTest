// @ts-check

const { test, expect } = require('@playwright/test');
const { googlePage } = require('./support/pageobjectmodel/pages/google.page');

//Data Generation
const button = [1,2,3,4,5,6,7,8,9,];

//Tests to verify order of operations functionality

for (const n of button) {
    test(`Should verify that ${n} is displayed`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        await google.searchFor("calculator");
        await page.getByRole('button', { name: `${n}`, exact: true }).click();
        await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${n}`);
    });
}
