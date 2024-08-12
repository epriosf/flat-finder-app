import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: '@typescript-eslint/parser',
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      // Add other rules as needed
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
];
