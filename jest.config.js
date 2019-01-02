module.exports = {
  testEnvironment: 'node',
  reporters: ['default', 'jest-junit'],
  transform: {
    '.*': '<rootDir>/node_modules/jest-css-modules',
  },
  modulePathIgnorePatterns: [
    '.cache/',
    'public/',
    'lighthouse.test.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.cache/',
    'public/',
    'lighthouse.test.js',
  ]
}
