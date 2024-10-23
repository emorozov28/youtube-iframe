import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
    },
    {
        ignores: ['webpack.config.js', 'postcss.config.js', 'eslint.config.mjs', 'demo/', 'dist/'],
    },
    {
        languageOptions: {
            globals: globals.browser,
        },
    },
    {
        ...pluginJs.configs.recommended,
        rules: {
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'prefer-const': 'error',
            'no-multiple-empty-lines': ['error', {max: 1}],
            'brace-style': ['error', '1tbs'],
            'space-in-parens': ['error', 'never'],
            'function-call-argument-newline': ['error', 'never'],
        },
    },
    ...tseslint.configs.recommended,
];
