/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!node_modules/**"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.js"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)?$": "babel-jest"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$"
  ],
  "moduleNameMapper": {
    "^.+\\.svg$": "jest-svg-transformer",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  "moduleFileExtensions": [
    "js",
    "ts",
    "jsx",
    "tsx",
    "json",
    "node",
  ],
  "watchPlugins": [],
  "resetMocks": true
};
