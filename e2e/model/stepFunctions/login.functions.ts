import { p } from 'core';
import { loginPage } from 'e2e/model/pageObjects';
import { browser } from 'protractor';

class LoginFunctions {
  async launchLoginUrl() {
    await browser.get(browser.baseUrl + loginPage.urlRoute);
  }

  async setUserName(userName: string) {
    await p.typeValue(loginPage.usernameField, userName);
  }

  async setUserPassword(password: string) {
    await p.typeValue(loginPage.passwordField, password);
  }

  async clickLoginBtn() {
    await p.click(loginPage.loginBtn);
  }
}

export const loginFunctions: LoginFunctions = new LoginFunctions();
