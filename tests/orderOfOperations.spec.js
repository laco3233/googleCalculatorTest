// @ts-check

const { test, expect } = require('@playwright/test');
const { googlePage } = require('./support/pageobjectmodel/pages/google.page');

//Tests to verify order of operations functionality with starting operatrs


test(`Should verify order of operations starting with ÷ followed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByRole('button', { name: '8', exact: true }).click();
    await google.divide.click();
    await page.getByRole('button', { name: '4', exact: true }).click();
    await google.plus.click();
    await page.getByRole('button', { name: '5', exact: true }).click();
    await google.subtract.click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await google.multiply.click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await google.equals.click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${8/4+5-3*2}`);
    await page.close();
});

test(`Should verify order of operations starting with × followed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByRole('button', { name: '6', exact: true }).click();
    await google.multiply.click();
    await page.getByRole('button', { name: '4', exact: true }).click();
    await google.divide.click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await google.subtract.click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await google.plus.click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await google.equals.click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${6*4/3-3+2}`);
    await page.close();
});

test(`Should verify order of operations starting with - followed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByRole('button', { name: '9', exact: true }).click();
    await google.subtract.click();
    await page.getByRole('button', { name: '4', exact: true }).click();
    await google.multiply.click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await google.plus.click();
    await page.getByRole('button', { name: '6', exact: true }).click();
    await google.divide.click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await google.equals.click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${9-4*3+6/2}`);
    await page.close();
});

test(`Should verify order of operations starting with + followed`, async ({ page }) => {
    const google = new googlePage(page);
    await google.goto();
    await google.searchFor("calculator");
    await page.getByRole('button', { name: '9', exact: true }).click();
    await google.plus.click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await google.multiply.click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await google.subtract.click();
    await page.getByRole('button', { name: '6', exact: true }).click();
    await google.divide.click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await google.equals.click();
    await expect(page.locator('xpath=//*[@id="cwos"]').first()).toHaveText(`${9+3*3-6/2}`);
    await page.close();
});


