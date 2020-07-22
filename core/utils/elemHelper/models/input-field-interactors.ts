/* tslint:disable */
import chalk from 'chalk';
import { browser, ElementFinder, protractor } from 'protractor';
import * as webdriver from 'selenium-webdriver';

import { timeout } from '../utils/validator';
import { browserWaitElementVisible } from './waiters';

/**
 * This method helps to send texts to web element
 * @param webElement
 * @param value
 * @param sleepTime
 * @param tryCount
 *
 * @example
 * const buttonElement=element(by.id('input[class='abc']'));
 * await p.typeValue(buttonElement,"hello");
 */

export const typeValue = (
  htmlElement: ElementFinder,
  value: string,
  timeout: number = Math.floor(
    Number(process.env.IMPLICIT_WAIT) / Number(process.env.TEST_RETRY_COUNT)
  ) || 5000,
  tryCount: number = Number(process.env.TEST_RETRY_COUNT) || 10
): webdriver.promise.Promise<void> => {
  return browser
    .wait(
      protractor.ExpectedConditions.presenceOf(htmlElement),
      timeout,
      `Element ${htmlElement.locator()} is not present`
    )
    .then(
      () => {
        htmlElement.sendKeys(value);
      },
      (error: any) => {
        if (tryCount > 0) {
          console.log(
            chalk.yellow(
              `Send keys retry ${tryCount} on target ${htmlElement.locator()}`
            )
          );
          typeValue(htmlElement, value, timeout, tryCount - 1);
        } else {
          console.error(
            chalk.redBright(
              `Error while sending keys on ${htmlElement.locator()}`
            )
          );
          throw error;
        }
      }
    );
};

/**
 * this method helps to type a date value in date input
 * @param dateInput
 * @param date
 */
export const typeDate = async (
  dateInput: ElementFinder,
  date: string
): Promise<void> => {
  await dateInput.click();
  await dateInput.clear();
  return dateInput.sendKeys(date);
};

/**
 * This method helps to clear specific text box contents
 * @param webElement
 * @param timeoutInMilliseconds
 */
export const clear = async (
  webElement: ElementFinder,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
): Promise<void> => {
  await browserWaitElementVisible(webElement, timeoutInMilliseconds);
  await webElement.clear();
};

/**
 * this element helps to get the attribute value of an element
 * @param htmlElement
 * @param attributeName
 * @param timeout
 * @param tryCount
 */
export const getAttribute = (
  htmlElement: ElementFinder,
  attributeName: string,
  timeout: number = Math.floor(
    Number(process.env.IMPLICIT_WAIT) / Number(process.env.TEST_RETRY_COUNT)
  ) || 5000,
  tryCount: number = Number(process.env.TEST_RETRY_COUNT) || 10
): webdriver.promise.Promise<string> => {
  return browser
    .wait(
      protractor.ExpectedConditions.presenceOf(htmlElement),
      timeout,
      `Element ${htmlElement.locator()} is not present`
    )
    .then(() => {
      return htmlElement.getAttribute(attributeName);
    })
    .then(
      (value: string) => value,
      (error: any) => {
        if (tryCount === 0) {
          console.error(
            chalk.redBright(
              `Error while getting attribute value on ${htmlElement.locator()}`
            )
          );
          throw error;
        }
        console.log(
          chalk.yellow(
            `getAttribute retry ${tryCount} on target ${htmlElement.locator()}`
          )
        );
        return getAttribute(htmlElement, attributeName, timeout, tryCount - 1);
      }
    );
};

/**
 * this method helps to get the css value of an element
 * @param htmlElement
 * @param cssValue
 * @param timeout
 * @param tryCount
 */
export const getCssValue = (
  htmlElement: ElementFinder,
  cssValue: string,
  timeout: number = Math.floor(
    Number(process.env.IMPLICIT_WAIT) / Number(process.env.TEST_RETRY_COUNT)
  ) || 5000,
  tryCount: number = Number(process.env.TEST_RETRY_COUNT) || 10
): webdriver.promise.Promise<string> => {
  return browser
    .wait(
      protractor.ExpectedConditions.presenceOf(htmlElement),
      timeout,
      `Element ${htmlElement.locator()} is not present`
    )
    .then(() => {
      return htmlElement.getCssValue(cssValue);
    })
    .then(
      (value: string) => value,
      (error: any) => {
        if (tryCount === 0) {
          console.error(
            chalk.redBright(
              `Error while getting css value on target ${htmlElement.locator()}`
            )
          );
          throw error;
        }
        console.log(
          chalk.yellow(
            `getCssValue retry ${tryCount} on target ${htmlElement.locator()}v`
          )
        );
        return getCssValue(htmlElement, cssValue, timeout, tryCount - 1);
      }
    );
};

/**
 * this method helps to get the text value of an element
 * @param htmlElement
 * @param timeout
 * @param tryCount
 */
export const getText = (
  htmlElement: ElementFinder,
  timeout: number = Math.floor(
    Number(process.env.IMPLICIT_WAIT) / Number(process.env.TEST_RETRY_COUNT)
  ) || 5000,
  tryCount: number = Number(process.env.TEST_RETRY_COUNT) || 10
): webdriver.promise.Promise<string> => {
  return browser
    .wait(
      protractor.ExpectedConditions.presenceOf(htmlElement),
      timeout,
      `Element ${htmlElement.locator()} is not present`
    )
    .then(() => {
      return htmlElement.getText();
    })
    .then(
      (value: string) => value,
      (error: any) => {
        if (tryCount === 0) {
          console.error(
            chalk.redBright(
              `Error while getting text on ${htmlElement.locator()}`
            )
          );
          throw error;
        }
        console.log(
          chalk.yellow(`getText retry ${tryCount} on ${htmlElement.locator()}`)
        );
        return getText(htmlElement, timeout, tryCount - 1);
      }
    );
};
