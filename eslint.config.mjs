import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/dist',
      '**/e2e',
      '**/node_modules',
      '**/assets',
      '**/coverage',
      '**/build',
      'packages/web/*',
      'packages/elvis/checkDeprecations.js',
      'packages/elvis/elvis.js',
      'packages/elvis/elvis.full.js',
      'packages/elvis/src/templates/*.js',
      'packages/react-test/*',
      'packages/vue-test/*',
      'packages/components/playwright-report/*',
      'packages/components/test-results/*',
      'packages/components/__snapshots__/*',
    ],
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'clear', 'info', 'error', 'dir', 'trace', 'table'],
        },
      ],

      'func-names': 'off',
    },
  },
  ...compat
    .extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      // 'plugin:@typescript-eslint/stylistic',
      'plugin:react/recommended',
    )
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        ...config.rules,
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    })),
  {
    files: ['**/*.ts', '**/*.tsx'],

    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 2019,
      sourceType: 'module',
    },

    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'clear', 'info', 'error', 'dir', 'trace', 'table'],
        },
      ],

      'func-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'react/prop-types': 'off',
      'prefer-rest-params': 'off',
    },
  },
];
