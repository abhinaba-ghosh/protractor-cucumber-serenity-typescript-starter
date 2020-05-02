import { by, element, ElementFinder } from 'protractor';

class LoginPage {
  public usernameField: ElementFinder;
  public passwordField: ElementFinder;
  public loginBtn: ElementFinder;
  public loginSuccessMsg: ElementFinder;
  public urlRoute: string;

  constructor() {
    this.urlRoute = '/login';
    this.usernameField = element(by.xpath('//*[@id="username"]'));
    this.passwordField = element(by.xpath('//*[@id="password"]'));
    this.loginBtn = element(by.xpath('//*[@id="login"]/button'));
    this.loginSuccessMsg = element(
      by.xpath('//div[contains(@class,"success")]')
    );
  }
}

export const loginPage: LoginPage = new LoginPage();
