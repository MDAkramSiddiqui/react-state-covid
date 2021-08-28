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
    ignorePatterns: ['node_modules/'],
    rules: {
        'react/jsx-filename-extension': 0,
    },
};
