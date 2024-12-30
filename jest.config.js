/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testPathIgnorePatterns: ['/App/Presentation/'],
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  }
};
