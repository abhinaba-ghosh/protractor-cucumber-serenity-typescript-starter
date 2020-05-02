/**
 * This file helps to create the download folder under the test report section.
 * This will make the download directory available before kick starting the test.
 * Then browser specific download directories will be created automatically inside this download folder
 */

import * as fs from 'fs';

require('dotenv-safe').config({
  allowEmptyValues: true,
  example: `${process.cwd()}/.env`,
});

const directory = `${process.cwd()}\\${
  process.env.TEST_REPORT_DIRECTORY
}\\downloads`;

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}
