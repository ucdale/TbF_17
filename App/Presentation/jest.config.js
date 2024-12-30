// eslint-disable-next-line
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: ['/node_modules/(?!axios).+\\.js$'],
  setupFilesAfterEnv: ['./src/setupTests.js']
};
