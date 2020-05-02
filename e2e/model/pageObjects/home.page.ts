import { by, element, ElementFinder } from 'protractor';

class HomePage {
  public homeSuccessMsg: ElementFinder;

  constructor() {
    this.homeSuccessMsg = element(
      by.xpath('//div[contains(@class,"success")]')
    );
  }
}

export const homePage: HomePage = new HomePage();
