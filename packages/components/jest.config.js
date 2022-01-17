module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/setupTests.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!@elvia/elvis-assets-icons)'],
};
