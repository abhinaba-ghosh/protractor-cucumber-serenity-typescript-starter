/* eslint-disable unicorn/no-abusive-eslint-disable */
// eslint-disable-next-line unicorn/no-abusive-eslint-disable
/* eslint-disable */
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
  },
  disableWarnings: true,
  fast: true,
});
exports.config = require('./config/protractor.conf.ts').config;
