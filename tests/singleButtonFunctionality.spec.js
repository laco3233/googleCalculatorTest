// @ts-check

const { test, expect } = require('@playwright/test');
const { googlePage } = require('./support/pageobjectmodel/pages/google.page');

//Data Generation
const button = [1,2,3,4,5,6,7,8,9];

//Tests to verify single button use functionality

test('should verify that 0 is displayed upon landing on search results page', async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0');
    await page.close();
});

for (const n of button) {
    test(`Should verify that ${n} is displayed`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        await google.searchFor("calculator");
        await google.clickButton(`${n}`);
        await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${n}`);
        await page.close();
    });
}


test(`Should verify that . is displayed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('point');
   // await page.getByLabel('point').click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('.');
    await page.close();
});

for (const n of button) {
    test(`Should verify that CE clears number ${n}`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        await google.searchFor("calculator");
        await google.clickButton(`${n}`);
        await google.clickButton('clear entry');
        await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0');
        await page.close();
    });
}


test(`Should verify that ÷ is displayed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('divide');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0 ÷');
    await page.close();
});


test(`Should verify that × is displayed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('multiply');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0 ×');
    await page.close();
});

test(`Should verify that - is displayed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('minus');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('-');
    await page.close();
});

test(`Should verify that = does nothing without any other inputs`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('equals');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0');
    await page.close();
});

test(`Should verify that + is displayed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('plus');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0 +');
    await page.close();
});

test(`Should verify that CE clears after pressing ÷ and displays 0`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('divide');
    await google.clickButton('clear entry');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0');
    await page.close();
});

test(`Should verify that CE clears after pressing × and displays 0`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('multiply');
    await google.clickButton('clear entry');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0');
    await page.close();
});

test(`Should verify that CE clears after pressing - and displays 0`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('minus');
    await google.clickButton('clear entry');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0');
    await page.close();
});

test(`Should verify that CE clears after pressing + and displays 0`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('plus');
    await google.clickButton('clear entry');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0');
    await page.close();
});

test('should verify that AC clears the answer', async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('9');
    await google.clickButton('plus');
    await google.clickButton('9');
    await google.clickButton('equals');
    await google.clickButton('all clear');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0');
    await page.close();
});