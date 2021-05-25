module.exports = {
    env: {
        // browser: true,
        es6: true,
        amd: true,
        node: true,
    },
    extends: ['airbnb-base'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        module: true,
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        'no-underscore-dangle': ['error', { allow: ['_id'] }],

        'max-len': ['error', { code: 120, ignoreStrings: true }],
        'global-require': 0,
    },
};
