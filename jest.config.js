/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
export default {
  testEnvironment: 'node',
  transform: {
    '\\.ts$': ['ts-jest', { tsconfig: 'src/test/tsconfig.json', useESM: true }],
  },
  moduleNameMapper: { '(.+)\\.js': '$1' }, // Because ts-jest doesn't support all TS features, namely import statements with .js extensions: https://github.com/kulshekhar/ts-jest/issues/1057
  extensionsToTreatAsEsm: ['.ts'],
};
