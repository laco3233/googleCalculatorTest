// @ts-check

const { test, expect } = require('@playwright/test');
const { googlePage } = require('./support/pageobjectmodel/pages/google.page');

//Data Generation
const num = [1,2,3,4,5,6,7,8,9];

let a = Math.ceil(Math.random() * num.length);
let b = Math.ceil(Math.random() * num.length);

let makeDifferent = () => {
    if (b === a) {
        b += 1;
    }
};
makeDifferent();

let c = parseFloat(String(`${a}.${b}`));
let d = parseFloat(String(`${b}.${a}`));

//Tests to verify division functionality

for (const n of num) {
    test(`should divide ${n} by ${n}`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        await google.searchFor("calculator");
        await page.getByRole('button', { name: `${n}`, exact: true }).click();
        await google.divide.click();
        await page.getByRole('button', { name: `${n}`, exact: true }).click();
        await google.equals.click();
        await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('1');
    });
}

for (const n of num) {
    test(`should divide ${n} by 0`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        await google.searchFor("calculator");
        await page.getByRole('button', { name: `${n}`, exact: true }).click();
        await google.divide.click();
        await page.getByRole('button', { name: `0`, exact: true }).click();
        await google.equals.click();
        await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('Infinity');
    });
}

for (const n of num) {
    test(`should divide 0 by ${n}`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        await google.searchFor("calculator");
        await page.getByRole('button', { name: `0`, exact: true }).click();
        await google.divide.click();
        await page.getByRole('button', { name: `${n}`, exact: true }).click();        
        await google.equals.click();
        await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText('0');
        await page.close();
    });
}

test('should divide non matching numbers', async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByRole('button', { name: `${a}`, exact: true }).click();
    await google.divide.click();
    await page.getByRole('button', { name:`${b}`, exact: true }).click();
    await google.equals.click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toContainText(`${parseFloat(Math.abs(a / b).toFixed(11))}`);
    await page.close();
});