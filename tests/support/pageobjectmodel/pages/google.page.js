// @ts-check

const { expect, test } = require('@playwright/test');

exports.googlePage = class googlePage {

  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    //Locators
    this.searchInput = page.locator('xpath=//*[@id="APjFqb"]');
    this.searchButton = page.getByLabel('Google Search').first();
  }

  async goto() {
    await this.page.goto('https://google.com/');
  }

  

//Actions
  async searchFor(searchQuery) {
    await this.searchInput.fill(searchQuery);
    await this.searchButton.click();
  }
  
}