// @ts-check

const { test, expect } = require('@playwright/test');
const { googlePage } = require('./support/pageobjectmodel/pages/google.page');

//Data Generation
const num = [1,2,3,4,5,6,7,8,9,0];

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

//Tests to verify addition functionality

for (const n of num) {
    test(`should multiply ${n} with ${n}`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        await google.searchFor("calculator");
        console.log(n);
        await page.getByRole('button', { name: `${n}`, exact: true }).click();
        await page.getByLabel('multiply').click();
        await page.getByRole('button', { name: `${n}`, exact: true }).click();
        await page.getByLabel('equals').click();
        await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${n * n}`);
    });
}

test('should mulitply non matching numbers', async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByRole('button', { name: `${a}`, exact: true }).click();
    await page.getByLabel('multiply').click();
    await page.getByRole('button', { name:`${b}`, exact: true }).click();
    await page.getByLabel('equals').click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${a * b}`);
});

test('should multiply numbers with decimals', async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByRole('button', { name: `${a}`, exact: true }).click();
    await page.getByLabel('point').click();
    await page.getByRole('button', { name:`${b}`, exact: true }).click();
    await page.getByLabel('multiply').click();    
    await page.getByRole('button', { name:`${b}`, exact: true }).click();
    await page.getByLabel('point').click();
    await page.getByRole('button', { name: `${a}`, exact: true }).click();
    await page.getByLabel('equals').click();
    console.log(c, d);
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${parseFloat((c * d).toFixed(2))}`);
});