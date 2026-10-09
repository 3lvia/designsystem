import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    // Jest resolves tests as CommonJS, so bypass the package's import-only exports map.
    '^@elvia/elvis-toolbox$': '<rootDir>/components/elvis-toolbox/dist/index.js',
    // Keep ESM .js specifiers in source, but let Jest resolve their .ts/.tsx files.
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/(?!@elvia/elvis-(assets-icons|typography|toolbox))'],
  // Ignore files using the .spec.tsx file names, they are for Playwright
  testPathIgnorePatterns: ['/node_modules/', '.spec.[jt]s(x)?'],
};

export default config;
