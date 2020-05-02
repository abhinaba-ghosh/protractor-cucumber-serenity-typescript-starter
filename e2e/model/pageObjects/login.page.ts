import { by, element, ElementFinder } from 'protractor';

class LoginPage {
  public usernameField: ElementFinder;
  public passwordField: ElementFinder;
  public loginBtn: ElementFinder;
  public urlRoute: string;

  constructor() {
    this.urlRoute = '/login';
    this.usernameField = element(by.css('*[id="username"]'));
    this.passwordField = element(by.css('*[id="password"]'));
    this.loginBtn = element(by.css('*[id="login"] button'));
  }
}

export const loginPage: LoginPage = new LoginPage();
