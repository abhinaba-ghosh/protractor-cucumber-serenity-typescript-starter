import { expect } from 'core/support/assert/expect';
import { loginPage } from 'e2e/model/pageObjects';
import { browser } from 'protractor';

class HomeFunctions {
  async checkLoginSuccess() {
    expect(loginPage.loginSuccessMsg).to.be.present;
  }

  async checkURLSecure() {
    expect(await browser.getCurrentUrl()).to.contain('secure');
  }
}

export const homeFunctions: HomeFunctions = new HomeFunctions();
