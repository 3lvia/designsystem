module.exports = {
    setupFilesAfterEnv: ['<rootDir>/test/jest-setup.js'],
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/test/jest-setup.js',
    }
};