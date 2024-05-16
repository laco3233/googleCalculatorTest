// @ts-check

const { test, expect } = require('@playwright/test');
const { googlePage } = require('./support/pageobjectmodel/pages/google.page');

//Data Generation
const button = [1,2,3,4,5,6,7,8,9,];

//Tests to verify single button use functionality

test('should verify that 0 is displayed upon landing on search results page', async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0');
});

for (const n of button) {
    test(`Should verify that ${n} is displayed`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        await google.searchFor("calculator");
        await page.getByRole('button', { name: `${n}`, exact: true }).click();
        await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${n}`);
    });
}


test(`Should verify that . is displayed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByLabel('point').click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('.');
});

for (const n of button) {
    test(`Should verify that CE clears number $${n}`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        await google.searchFor("calculator");
        await page.getByRole('button', { name: `${n}`, exact: true }).click();
        await page.getByLabel('clear entry').click();
        await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0');
    });
}


test(`Should verify that ÷ is displayed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByLabel('divide').click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0 ÷');
});


test(`Should verify that × is displayed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByLabel('multiply').click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0 ×');
});

test(`Should verify that - is displayed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByLabel('minus').click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('-');
});

test(`Should verify that + is displayed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByLabel('plus').click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0 +');
});