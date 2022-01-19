module.exports = {
    'env': {
        'node': true,
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'ignorePatterns': [
        '**/node_modules/**',
        '**/public/**',
        '.babelrc.json',
        'tsconfig.json',
        'webpack.config.js',
        '.eslintrc.js'
    ],
    'rules': {
        'prettier/prettier': 'error',
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
        'semi': [1, 'always'],
        'no-unused-vars': 'error'
    },
    'settings': {
        'react': {
            'version': 'detect'
        }
    }
};
