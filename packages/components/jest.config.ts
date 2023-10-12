import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/setupTests.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!@elvia/elvis-(assets-icons|typography|toolbox))'],
  // Ignore files using the .spec.tsx file names, they are for Playwright
  testPathIgnorePatterns: ['/node_modules/', '.spec.[jt]s(x)?'],
};

export default config;
