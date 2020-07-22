/* tslint:disable */
import chalk from 'chalk';
import {
  browser,
  by,
  ElementFinder,
  ExpectedConditions,
  protractor,
} from 'protractor';
import * as webdriver from 'selenium-webdriver';

import { timeout } from '../utils/validator';
import {
  browserWaitElementClickable,
  browserWaitElementPresence,
  browserWaitElementVisible,
} from './waiters';

/**
 * This method helps to click specific web element
 * @param webElement
 * @param timeout
 * @param tryCount
 *
 * @example
 * const buttonElement=element(by.id('ok'));
 * await p.click(buttonElement);
 */
export const click = (
  htmlElement: ElementFinder,
  timeout: number = Math.floor(
    Number(process.env.IMPLICIT_WAIT) / Number(process.env.TEST_RETRY_COUNT)
  ) || 5000,
  tryCount: number = Number(process.env.TEST_RETRY_COUNT) || 10
): webdriver.promise.Promise<void> => {
  return browser
    .wait(
      protractor.ExpectedConditions.elementToBeClickable(htmlElement),
      timeout,
      `Element ${htmlElement.locator()} not clickable`
    )
    .then(() => htmlElement.click())
    .then(
      () => {
        console.log(
          chalk.green(`Click success on target ${htmlElement.locator()}`)
        );
      },
      (error: any) => {
        if (tryCount > 0) {
          console.log(chalk.yellow(`Error Occured:${error}`));
          console.log(
            chalk.yellow(
              `Click retry ${tryCount} on target ${htmlElement.locator()}`
            )
          );
          click(htmlElement, timeout, tryCount - 1);
        } else {
          console.error(chalk.redBright(`Error Occured:${error}`));
          console.error(
            chalk.redBright(`Error while clicking on ${htmlElement.locator()}`)
          );
          throw error;
        }
      }
    );
};

/**
 * This click method does not check button click-ability before clicking the button.
 * It is a blind click and only recommended if normal click method is not working
 * Sometimes, normal click function throws element not displayed error, if you are sure that the element is present, use forClick to click the element
 * @param htmlElement
 * @param timeout
 * @param tryCount
 */
export const forceClick = (
  htmlElement: ElementFinder,
  timeout: number = Math.floor(
    Number(process.env.IMPLICIT_WAIT) / Number(process.env.TEST_RETRY_COUNT)
  ) || 5000,
  tryCount: number = Number(process.env.TEST_RETRY_COUNT) || 10
): webdriver.promise.Promise<void> => {
  return htmlElement.click().then(
    () => {
      console.log(
        chalk.green(`Click success on target ${htmlElement.locator()}`)
      );
    },
    (error: any) => {
      if (tryCount > 0) {
        htmlElement.click().then(
          () => {
            console.log(
              chalk.green(`Click success on target ${htmlElement.locator()}`)
            );
          },
          (error: any) => {
            console.log(chalk.yellow(`Error Occurred:${error}`));
            console.log(
              chalk.yellow(
                `Click retry ${tryCount} on target ${htmlElement.locator()}`
              )
            );
            browser.sleep(timeout);
            forceClick(htmlElement, timeout, tryCount - 1);
          }
        );
      } else {
        console.error(chalk.redBright(`Error Occurred:${error}`));
        console.error(
          chalk.redBright(`Error while clicking on ${htmlElement.locator()}`)
        );
        throw error;
      }
    }
  );
};

/**
 * This method performs click based on JSExecutor
 * When user performs some opeartion in one tab in form builder component and wants to switch to other tab to perform some operations,this method can be used in that scenario
 * @param htmlElement
 * @param timeout
 * @param tryCount
 */
export const jsClick = (
  htmlElement: ElementFinder,
  timeout: number = Math.floor(
    Number(process.env.IMPLICIT_WAIT) / Number(process.env.TEST_RETRY_COUNT)
  ) || 5000,
  tryCount: number = Number(process.env.TEST_RETRY_COUNT) || 10
): webdriver.promise.Promise<void> => {
  return browser.driver
    .executeScript('arguments[0].click()', htmlElement.getWebElement())
    .then(
      () => {
        console.log(
          chalk.green(`Click success on target ${htmlElement.locator()}`)
        );
      },
      (error: any) => {
        if (tryCount > 0) {
          console.log(chalk.yellow(`Error Occured:${error}`));
          console.log(
            chalk.yellow(
              `Click retry ${tryCount} on target ${htmlElement.locator()}`
            )
          );
          browser.sleep(timeout);
          jsClick(htmlElement, timeout, tryCount - 1);
        } else {
          console.error(chalk.redBright(`Error Occured:${error}`));
          console.error(
            chalk.redBright(`Error while clicking on ${htmlElement.locator()}`)
          );
          throw error;
        }
      }
    );
};

/**
 * This method helps to hover and click specific web element
 * @param webElement
 * @param timeoutInMilliseconds
 *
 * @example
 * const buttonElement=element(by.id('ok'));
 * await p.hoverAndClick(buttonElement);
 */
export const hoverAndClick = async (
  webElement: ElementFinder,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
): webdriver.promise.Promise<void> => {
  await browserWaitElementPresence(webElement, timeoutInMilliseconds);
  await browser.actions().mouseMove(webElement).click().perform();
};

/**
 * This method helps to hover and click specific web element
 * @param webElement
 * @param timeoutInMilliseconds
 *
 * @example
 * await p.hoverAndClick(element);
 */
export const tap = async (
  webElement: ElementFinder,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
): webdriver.promise.Promise<void> => {
  await browserWaitElementClickable(webElement, timeoutInMilliseconds);
  await browser.touchActions().tap(webElement).perform();
};

/**
 * This method helps to select the checkboxes
 * @param checkboxElement
 * @param selected
 */
export const selectCheckbox = async (
  checkboxElement: ElementFinder,
  selected: boolean
): webdriver.promise.Promise<void> => {
  const isCheckboxSelected: boolean = await checkboxElement.isSelected();
  if (selected !== isCheckboxSelected) {
    await click(checkboxElement);
  }
};

/**
 * this method helps to select an option from single select element
 * @param selectOptionLocator
 * @param textToSelect
 */
export const selectValueFromList = async (
  selectOptionLocator: ElementFinder,
  textToSelect: string
): webdriver.promise.Promise<void> => {
  await browserWaitElementVisible(selectOptionLocator);
  await click(
    await selectOptionLocator
      .all(by.css('li'))
      .filter(async (element) => {
        return (await element.getText()) === textToSelect;
      })
      .first()
  );
};

/**
 * this method helps to select an option from multiple select element by losing focus mechanism
 * @param selectOptionLocator
 * @param textToSelect
 * @param loseFocusLocator
 */
export const selectValueFromMultipleSelectOption = async (
  selectOptionLocator: ElementFinder,
  textToSelect: string,
  loseFocusLocator: ElementFinder
): webdriver.promise.Promise<void> => {
  await browser.wait(
    ExpectedConditions.elementToBeClickable(selectOptionLocator),
    Number(process.env.IMPLICIT_WAIT),
    `Select option element is not clickable: ${selectOptionLocator}`
  );
  await selectOptionLocator.click();
  const option: ElementFinder = selectOptionLocator.element(
    by.cssContainingText('li', textToSelect)
  );
  await browser.wait(
    ExpectedConditions.elementToBeClickable(option),
    Number(process.env.IMPLICIT_WAIT),
    `Element with text: ${textToSelect} is not visible`
  );
  await option.click();
  await browser.wait(
    ExpectedConditions.elementToBeClickable(loseFocusLocator),
    Number(process.env.IMPLICIT_WAIT),
    `Element to lose focus is not clickable`
  );
  return loseFocusLocator.click();
};

/**
 * This method helps to perform slow typing sending one character at a time
 * @param elm
 * @param keys
 * @param delay
 */
export const slowType = async (
  elm,
  keys,
  delay = 100
): webdriver.promise.Promise<void> => {
  await click(elm);

  // tslint:disable-next-line: prefer-for-of
  for (const element of keys) {
    await browser.actions().sendKeys(element).perform();
    await browser.sleep(delay);
  }
};

/**
 * this method helps to selece an option from ComboBox
 * @param selectOptionLocator
 * @param textToSelect
 */
export const selectValueFromComboBox = async (
  selectOptionLocator: ElementFinder,
  textToSelect: string
): Promise<void> => {
  await browserWaitElementVisible(selectOptionLocator);
  const _element: ElementFinder = selectOptionLocator.element(
    by.cssContainingText('li', textToSelect)
  );
  await click(_element);
};
