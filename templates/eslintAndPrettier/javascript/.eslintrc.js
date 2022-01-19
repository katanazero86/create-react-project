module.exports = {
    'env': {
        'node': true,
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'ignorePatterns': [
        "**/node_modules/**",
        "**/public/**",
        ".babelrc.json",
        "tsconfig.json",
        "webpack.config.js",
        ".eslintrc.js",
    ],
    'rules': {
        'prettier/prettier': 'error',
        'react/prop-types': 'off',
        'no-console': 'off',
        'semi': [1, 'always'],
        'no-unused-vars': 'error'
    },
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
}
