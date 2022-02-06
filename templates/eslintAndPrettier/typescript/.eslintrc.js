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
        'react', '@typescript-eslint', 'prettier'
    ],
    'ignorePatterns': [
        '**/node_modules/**',
        '**/public/**',
        '.babelrc.json',
        'tsconfig.json',
        'webpack.config.js',
        '.eslintrc.js',
        '**/src/setupTests.js',
        '**/src/*.test.js',
        '**/src/*.spec.js',
        '**/src/*.test.ts',
        '**/src/*.spec.ts',
        '**/src/*.test.jsx',
        '**/src/*.spec.jsx',
        '**/src/*.test.tsx',
        '**/src/*.spec.tsx',
        'jest.config.js',
    ],
    'rules': {
        'prettier/prettier': 'error',
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
        'semi': [1, 'always'],
        'no-unused-vars': 'warn'
    },
    'settings': {
        'react': {
            'version': 'detect'
        }
    }
};
