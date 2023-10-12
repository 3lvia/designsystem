import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/setupTests.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!@elvia/elvis-(assets-icons|typography|toolbox))'],
};

export default config;
