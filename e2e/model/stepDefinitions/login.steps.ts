import { Given, When } from 'cucumber';
import { loginFunctions } from 'e2e/model/stepFunctions';

Given(/^user navigate to the target login page$/, async () => {
  await loginFunctions.launchLoginUrl();
});

When(
  /^user enter "(.*)" and "(.*)"$/,
  async (username: string, password: string) => {
    await loginFunctions.setUserName(username);
    await loginFunctions.setUserPassword(password);
  }
);

When(/^user click the login button$/, async () => {
  await loginFunctions.clickLoginBtn();
});
