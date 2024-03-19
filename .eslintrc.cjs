module.exports = {
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['setupTests.js', '*.cjs'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.png'],
      },
      typescript: {},
    },
  },
  rules: {
    'no-async-promise-executor': 'error',
    'require-atomic-updates': 'error',
    'array-callback-return': 'error',
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    // We need the below definition because the rule no longer exists, but "eslint-config-react-app" still depends on an old version of @typescript-eslint/eslint-plugin
    // TODO: Remove once "eslint-config-react-app" upgrades the dep
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    // We need the below definition for the same reason as the above. This adds back the behaviour that "no-angle-bracket-type-assertion" used to provide
    // TODO: Remove once "eslint-config-react-app" upgrades the dep
    '@typescript-eslint/consistent-type-assertions': [
      'warn',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow',
      },
    ],
    'arrow-body-style': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/no-children-prop': 'off',
    'no-prototype-builtins': 'off',
    'import/named': 'off',
    'no-useless-catch': 'off',
    'no-case-declarations': 'off',
  },
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true,
  },
}
