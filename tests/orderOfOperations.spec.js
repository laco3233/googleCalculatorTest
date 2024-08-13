// @ts-check

const { test, expect } = require('@playwright/test');
const { googlePage } = require('./support/pageobjectmodel/pages/google.page');

//Tests to verify order of operations functionality with starting operatrs


test(`Should verify order of operations starting with ÷ followed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('8');
    await google.clickButton('divide');
    await google.clickButton('4');
    await google.clickButton('plus');
    await google.clickButton('5');
    await google.clickButton('minus');
    await google.clickButton('3');
    await google.clickButton('multiply');
    await google.clickButton('2');
    await google.clickButton('equals');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${8/4+5-3*2}`);
    await page.close();
});

test(`Should verify order of operations starting with × followed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('6');
    await google.clickButton('multiply');
    await google.clickButton('4');
    await google.clickButton('divide');
    await google.clickButton('3');
    await google.clickButton('minus');
    await google.clickButton('3');
    await google.clickButton('plus');
    await google.clickButton('2');
    await google.clickButton('equals');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${6*4/3-3+2}`);
    await page.close();
});

test(`Should verify order of operations starting with - followed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('9');
    await google.clickButton('minus');
    await google.clickButton('4');
    await google.clickButton('multiply');
    await google.clickButton('3');
    await google.clickButton('plus');
    await google.clickButton('6');
    await google.clickButton('divide');
    await google.clickButton('2');
    await google.clickButton('equals');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${9-4*3+6/2}`);
    await page.close();
});

test(`Should verify order of operations starting with + followed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton('9');
    await google.clickButton('plus');
    await google.clickButton('3');
    await google.clickButton('multiply');
    await google.clickButton('3');
    await google.clickButton('minus');
    await google.clickButton('6');
    await google.clickButton('divide');
    await google.clickButton('2');
    await google.clickButton('equals');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${9+3*3-6/2}`);
    await page.close();
});


