import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/setupTests.js',
    'styled-components': 'styled-components/dist/styled-components.browser.cjs.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!@elvia/elvis-(assets-icons|typography|toolbox))'],
};

export default config;
