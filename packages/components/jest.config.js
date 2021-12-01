const config = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/setupTests.js',
  },
};

module.exports = config;
