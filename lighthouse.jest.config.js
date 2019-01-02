module.exports = {
  testEnvironment: 'node',
  reporters: ['default', 'jest-junit'],
  modulePathIgnorePatterns: [
    '.cache/',
    'public/',
    'src/',
  ],
}
