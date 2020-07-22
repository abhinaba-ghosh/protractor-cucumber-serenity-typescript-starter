import chalk from 'chalk';
import { browser, ElementFinder, ExpectedConditions } from 'protractor';

import {
  getDeafultTextTextIsStillPresentOnElementMessage,
  getDefaultCurrentUrlContainsTheString,
  getDefaultCurrentUrlDoesNotContainStringMessage,
  getDefaultCurrentUrlIsDifferentThanExpectedUrlMessage,
  getDefaultCurrentUrlIsEqualToExpectedUrlMessage,
  getDefaultIsNotPresentMessage,
  getDefaultIsStillPresentMessage,
  getDefaultIsStillVisibleMessage,
  getDefaultTextTextNotPresentOnElementMessage,
} from '../utils/message-builder';
import { timeout } from '../utils/validator';

/**
 * this method checks one element contains all the required values. Method returns true if it contains all the required values.
 * @param elementToCheck
 * @param values
 */
export const doesElementContainAllValues = async (
  elementToCheck: ElementFinder,
  ...values: string[]
): Promise<boolean> => {
  return elementToCheck.getText().then((text) => {
    return values.reduce((previous, current) => {
      return text.includes(current) && previous;
    }, true);
  });
};

/**
 * this method awaits the execution untill an element is clickable
 * @param selectOptionLocator
 */
export const browserWaitElementClickable = async (
  selectOptionLocator: ElementFinder,
  customWait?: number
): Promise<boolean> =>
  browser.wait(
    ExpectedConditions.elementToBeClickable(selectOptionLocator),
    Number(customWait || process.env.IMPLICIT_WAIT),
    `Element is not clickable: ${selectOptionLocator.locator()}`
  );

/**
 * this method awaits the execution until an element is visible
 * @param selectOptionLocator
 */

/**
 * this method awaits the execution untill an element is visible
 * @param selectOptionLocator
 * @param timeout
 * @param tryCount
 */
export const browserWaitElementVisible = async (
  selectOptionLocator: ElementFinder,
  timeout: number = Number(process.env.IMPLICIT_WAIT) || 10000,
  tryCount: number = Math.floor(Number(process.env.TEST_RETRY_COUNT) / 2) || 5
): Promise<boolean> => {
  return browser
    .wait(
      ExpectedConditions.visibilityOf(selectOptionLocator),
      Number(Math.floor(Number(timeout) / Number(tryCount))),
      `Element is not visible: ${selectOptionLocator.locator()}`
    )
    .then(
      () => true,
      (error) => {
        tryCount = tryCount - 1;
        if (tryCount > 0) {
          console.log(chalk.yellow(`Error Occured: ${error}`));
          console.log(
            chalk.yellow(
              `Re-trying waiting for Element ${selectOptionLocator.parentElementArrayFinder.locator_} to appear, try ${tryCount} times more`
            )
          );
          return browserWaitElementVisible(
            selectOptionLocator,
            timeout -
              Number(Math.floor(Number(timeout) / Number(tryCount + 1))),
            tryCount
          );
        } else {
          console.error(chalk.redBright(`Error Occured: ${error}`));
          console.error(
            chalk.redBright(
              `Error while clicking on ${selectOptionLocator.locator()}`
            )
          );
          throw error + getDefaultIsStillVisibleMessage(selectOptionLocator);
        }
      }
    );
};

/**
 * This method helps to wait until an element present in the DOM
 * @param webElement
 * @param timeoutInMilliseconds
 */
export const browserWaitElementPresence = async (
  webElement: ElementFinder,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
): Promise<boolean> =>
  browser.wait(
    ExpectedConditions.presenceOf(webElement),
    timeoutInMilliseconds,
    getDefaultIsNotPresentMessage(webElement)
  );

/**
 * This method helps to wait untill an element not present in the DOM
 * @param webElement
 * @param timeoutInMilliseconds
 */
export const browserWaitElementNotToBePresent = async (
  webElement: ElementFinder,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
): Promise<boolean> =>
  browser.wait(
    ExpectedConditions.stalenessOf(webElement),
    timeoutInMilliseconds,
    getDefaultIsStillPresentMessage(webElement)
  );

/**
 * This method helps to wait untill an element not visible in the DOM
 * @param webElement
 * @param timeoutInMilliseconds
 * @tryCount
 */
export const browserWaitElementNotToBeVisible = async (
  selectOptionLocator: ElementFinder,
  timeout: number = Number(process.env.IMPLICIT_WAIT) || 10000,
  tryCount: number = Math.floor(Number(process.env.TEST_RETRY_COUNT) / 2) || 5
): Promise<boolean> => {
  return browser
    .wait(
      ExpectedConditions.invisibilityOf(selectOptionLocator),
      Number(Math.floor(Number(timeout) / Number(tryCount))),
      `Element is not visible: ${selectOptionLocator.locator()}`
    )
    .then(
      () => true,
      (error) => {
        tryCount = tryCount - 1;
        if (tryCount > 0) {
          console.log(chalk.yellow(`Error Occured: ${error}`));
          console.log(
            chalk.yellow(
              `Re-trying waiting for Element ${selectOptionLocator.parentElementArrayFinder.locator_} to disappear, try ${tryCount} times more`
            )
          );
          return browserWaitElementNotToBeVisible(
            selectOptionLocator,
            timeout -
              Number(Math.floor(Number(timeout) / Number(tryCount + 1))),
            tryCount
          );
        } else {
          console.error(chalk.redBright(`Error Occured: ${error}`));
          console.error(
            chalk.redBright(
              `Error ${selectOptionLocator.locator()} did not disappear`
            )
          );
          throw error;
        }
      }
    );
};

/**
 * This method helps to wait untill specific text is present in specific element
 * @param webElement
 * @param text
 * @param timeoutInMilliseconds
 */
export const browserWaitTextToBePresentInElement = async (
  webElement: ElementFinder,
  text: string,
  timeoutInMilliseconds = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
): Promise<boolean> =>
  browser.wait(
    ExpectedConditions.textToBePresentInElement(webElement, text),
    timeoutInMilliseconds,
    getDefaultTextTextNotPresentOnElementMessage(webElement, text)
  );

/**
 * This method helps to wait untill specific text is present in specific element
 * @param webElement
 * @param text
 * @param timeoutInMilliseconds
 */
export const browserWaitTextToBePresentInElementValue = async (
  webElement: ElementFinder,
  text: string,
  timeoutInMilliseconds = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
): Promise<boolean> =>
  browser.wait(
    ExpectedConditions.textToBePresentInElementValue(webElement, text),
    timeoutInMilliseconds,
    getDefaultTextTextNotPresentOnElementMessage(webElement, text)
  );

/**
 * This method helps to wait untill specific text not to be present in specific element
 * @param webElement
 * @param text
 * @param timeoutInMilliseconds
 */
export const browserWaitTextNotToBePresentInElement = async (
  webElement: ElementFinder,
  text: string,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
): Promise<boolean> =>
  browser.wait(
    ExpectedConditions.not(
      ExpectedConditions.textToBePresentInElement(webElement, text)
    ),
    timeoutInMilliseconds,
    getDeafultTextTextIsStillPresentOnElementMessage(webElement, text)
  );

/**
 * This method helps to wait untill browser url to be equal to expected url
 * @param expectedUrl
 * @param timeoutInMilliseconds
 */
export const browerWaitUrlToBeEqualToExpectedUrl = async (
  expectedUrl: string,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
): Promise<boolean> =>
  browser.wait(
    ExpectedConditions.urlIs(expectedUrl),
    timeoutInMilliseconds,
    getDefaultCurrentUrlIsDifferentThanExpectedUrlMessage(expectedUrl)
  );

/**
 * This method helps to wait untill browser url not to be equal to expected url
 * @param expectedUrl
 * @param timeoutInMilliseconds
 */
export const browserWaitUrlNotToBeEqualToExpectedUrl = async (
  expectedUrl: string,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
): Promise<boolean> =>
  browser.wait(
    ExpectedConditions.not(ExpectedConditions.urlIs(expectedUrl)),
    timeoutInMilliseconds,
    getDefaultCurrentUrlIsEqualToExpectedUrlMessage(expectedUrl)
  );

/**
 * This method helps to wait untill url contains specific text
 * @param url
 * @param timeoutInMilliseconds
 */
export const browserWaitUrlToContainString = async (
  url: string,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
): Promise<boolean> =>
  browser.wait(
    ExpectedConditions.urlContains(url),
    timeoutInMilliseconds,
    getDefaultCurrentUrlDoesNotContainStringMessage(url)
  );

/**
 * This method helps to wait untill url des not contain the specific text
 * @param url
 * @param timeoutInMilliseconds
 */
export const browserWaitUrlNotToContainString = async (
  url: string,
  timeoutInMilliseconds: number = Number(process.env.IMPLICIT_WAIT) ||
    timeout.timeoutInMilliseconds
): Promise<boolean> =>
  browser.wait(
    ExpectedConditions.not(ExpectedConditions.urlContains(url)),
    timeoutInMilliseconds,
    getDefaultCurrentUrlContainsTheString(url)
  );

/**
 * this method awaits the execution untill an element is displayed.
 * @param selectOptionLocator
 */
export const isElementDisplayed = async (
  selectOptionLocator: ElementFinder
): Promise<boolean> => {
  return browser.wait(
    ExpectedConditions.visibilityOf(selectOptionLocator),
    Number(process.env.IMPLICIT_WAIT),
    `Element is not displayed: ${selectOptionLocator.locator()}`
  );
};
