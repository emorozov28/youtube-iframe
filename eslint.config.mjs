import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [{
        files: ['**/*.{js,mjs,cjs,ts,tsx}'], // Додано .tsx для React
    },
    {
        ignores: [
            'webpack.config.js',
            'webpack.config.react.js',
            'postcss.config.js',
            'eslint.config.mjs',
            'demo/',
            'dist/',
        ],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser, // Додано глобальні змінні для браузера
                // Можна додати інші глобальні змінні, якщо потрібно
            },
            parser: '@typescript-eslint/parser', // Використовуємо парсер TypeScript
            parserOptions: {
                tsconfigRootDir: __dirname, // Вказуємо корінь для tsconfig
                project: ['./tsconfig.json'], // Вказуємо на файл tsconfig
                ecmaVersion: 2020, // Використовуємо ES2020
                sourceType: 'module', // Дозволяємо використання модулів
                ecmaFeatures: {
                    jsx: true, // Дозволяємо JSX
                },
            },
        },
    },
    {
        ...pluginJs.configs.recommended,
        rules: {
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'prefer-const': 'error',
            'no-multiple-empty-lines': ['error', {
                max: 1
            }],
            'brace-style': ['error', '1tbs'],
            'space-in-parens': ['error', 'never'],
            'function-call-argument-newline': ['error', 'never'],
            // Додаткові правила для TypeScript та React
            '@typescript-eslint/no-explicit-any': 'warn', // Попередження про 'any'
            '@typescript-eslint/explicit-module-boundary-types': 'off', // Вимкнути явні типи для експортованих функцій
            'react/react-in-jsx-scope': 'off', // Не потрібно імпортувати React в нових версіях React
        },
    },
    ...tseslint.configs.recommended,
    // Додайте конфігурацію для React, якщо використовуєте:
    {
        files: ['**/*.tsx'],
        rules: {
            'react/prop-types': 'off', // Вимкнути prop-types для TypeScript
            'react/jsx-filename-extension': [
                'warn',
                {
                    extensions: ['.tsx']
                }, // Дозволяємо JSX тільки у .tsx файлах
            ],
        },
    },
];
