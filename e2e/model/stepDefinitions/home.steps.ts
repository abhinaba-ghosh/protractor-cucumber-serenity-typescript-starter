import { Then, When } from 'cucumber';
import { homeFunctions } from 'e2e/model/stepFunctions';

Then(/^user should see the login success message$/, async () => {
  await homeFunctions.checkLoginSuccess();
});

When(/^user validates the url is secure$/, async () => {
  await homeFunctions.checkURLSecure();
});
