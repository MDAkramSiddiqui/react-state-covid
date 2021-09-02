module.exports = {
    parser: '@babel/eslint-parser',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ['airbnb', 'prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        babelOptions: {
            presets: ['@babel/preset-react'],
        },
    },
    plugins: ['prettier', 'react', 'react-hooks', 'jsx-a11y'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['node_modules/', 'dist/'],
    rules: {
        'react/jsx-filename-extension': 0,
        'react/no-array-index-key': 0,
        'no-use-before-define': 0,
        'no-shadow': 0,
        'no-unused-vars': 1,
        quotes: [2, 'single', { avoidEscape: true }],
    },
};
