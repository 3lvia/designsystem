/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/setupTests.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!@elvia/elvis-(assets-icons|typography))'],
};

module.exports = config;
