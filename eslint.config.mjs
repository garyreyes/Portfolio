// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', '*.min.*'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Astro components, plus the jsx-a11y rule set.
  // Nearly all markup in this project lives in .astro files, so this is
  // where accessibility linting earns its keep (PRD §10).
  ...astro.configs['flat/recommended'],
  ...astro.configs['flat/jsx-a11y-recommended'],

  // Layer boundary, enforced by lint rather than by discipline.
  // See ARCHITECTURE.md "Layer boundaries". Components render; they never
  // reach outside the app. All outbound calls live in a service/query file.
  {
    files: ['src/features/*/components/**', 'src/shared/components/**', 'src/layouts/**'],
    rules: {
      'no-restricted-globals': [
        'error',
        {
          name: 'fetch',
          message:
            'Components must not make outbound calls. Move this into the feature’s service.ts or queries.ts (see ARCHITECTURE.md).',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'astro:content',
              message:
                'Components must not query content directly. Call the feature’s queries.ts instead (see ARCHITECTURE.md).',
            },
          ],
        },
      ],
    },
  },

  // Build/tooling scripts run in Node, not the browser.
  {
    files: ['scripts/**/*.mjs', '*.config.mjs', 'eslint.config.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];
