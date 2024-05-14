// @ts-check

const { test, expect } = require('@playwright/test');
const { googlePage } = require('./support/pageobjectmodel/pages/google.page');

// test.beforeAll("Naviagate to Google and search for calculator", async ({ page }) => {
   

// })

// test.afterEach(async ({ page }) => {
//     await page.getByText('AC').click();
// })

//Tests to verify addition functionality
const num = [1,2,3,4,5,6,7,8,9,0];

for(const n of num){
    test(`should add ${n} to ${n}`, async ({ page }) => {
        const google = new googlePage(page);
        await google.goto();
        //await google.searchFor();
        //await page.goto('https://google.com/');
        await page.locator('xpath=//textarea', {has:'q'}).fill('calculator');
        await page.getByText('Google Search').click();
        await page.getByText(`${n}`).click();
        await page.getByText('+').click();
        await page.getByText(`${n}`).click();

        await expect(page.getByText(`${n+n}`)).toBeVisible();   
});
}
