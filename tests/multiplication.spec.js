// @ts-check

const { test, expect } = require('@playwright/test');
const { googlePage } = require('./support/pageobjectmodel/pages/google.page');

//Data Generation
const num = [1,2,3,4,5,6,7,8,9];

let a = Math.floor(Math.random() * num.length);
let b = Math.floor(Math.random() * num.length);

let makeDifferent = () => {
    if (b === a) {
        b += 1;
    }
};
makeDifferent();

let c = parseFloat(String(`${a}.${b}`));
let d = parseFloat(String(`${b}.${a}`));

//Tests to verify multiplication functionality

for (const n of num) {
    test(`should multiply ${n} by ${n}`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        await google.searchFor("calculator");
        await google.clickButton(`${n}`);
        await google.clickButton('multiply');
        await google.clickButton(`${n}`);
        await google.clickButton('equals');
        await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${n * n}`);
        await page.close();
    });
}

for (const n of num) {
    test(`should multiply ${n} by 0`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        await google.searchFor("calculator");
        await google.clickButton(`${n}`);
        await google.clickButton('multiply');
        await google.clickButton('0');
        await google.clickButton('equals');
        await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0');
        await page.close();
    });
}

test('should mulitply non matching numbers', async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await google.clickButton(`${a}`);
    await google.clickButton('multiply');
    await google.clickButton(`${b}`);
    await google.clickButton('equals');
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${a * b}`);
    await page.close();
});