// @ts-check

const { expect, test } = require('@playwright/test');

exports.googlePage = class googlePage {

  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://google.com/');
  }

  //Locators
//   searchInput = this.page.getByRole('textbox', {name: 'Search'}).fill('calculator');
//   searchButton = this.page.getByText('Google Search');

//Actions
//   async searchFor() {
//     await this.searchInput;
//     await this.searchButton.click();
//   }
}