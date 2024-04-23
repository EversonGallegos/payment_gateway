module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: { ignoreCodes: ['TS6059'] },
      isolatedModules: true,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!<rootDir>/node_modules/'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/singleton.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  resetMocks: true,
  testMatch: ['**/?(*.)+(spec).ts'],
};