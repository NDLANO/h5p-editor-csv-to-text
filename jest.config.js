/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  transform: {
    '.ts': [
      'ts-jest',
      {
        tsconfig: './tsconfig.jest.json',
      },
    ],
  },
};
