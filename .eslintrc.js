/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint. 
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'simple-import-sort'],
  rules: {
    'prettier/prettier': 'error',
    indent: 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',

    quotes: 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      { allowTemplateLiterals: true },
    ],

    'simple-import-sort/sort': 'error',

    'unicorn/filename-case': [
      'error',
      {
        cases: {
          pascalCase: true,
          kebabCase: true,
        },
      },
    ],
  },
};
