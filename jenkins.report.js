/* eslint-disable unicorn/no-abusive-eslint-disable */
// eslint-disable-next-line unicorn/no-abusive-eslint-disable
/* eslint-disable */

const cucumberJunitConvert = require('cucumber-junit-convert');

const options = {
  inputJsonFile: 'target/cucumber_report.json',
  outputXmlFile: 'target/cucumber_report.xml',
};

cucumberJunitConvert.convert(options);
