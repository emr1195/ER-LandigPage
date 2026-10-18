module.exports = {
  ignorePatterns: ['setupTests.js', '*.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
  ],
  plugins: ['react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.png'],
      },
    },
  },
  rules: {
    'no-async-promise-executor': 'error',
    'require-atomic-updates': 'error',
    'array-callback-return': 'error',
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'arrow-body-style': 'off',
    'no-unused-vars': 'off',
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
