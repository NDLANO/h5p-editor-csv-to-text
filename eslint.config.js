import eslintConfigNdlaH5P from 'eslint-config-ndla-h5p';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  tseslint.configs.recommended,
  eslintConfigNdlaH5P.configs['flat/recommended'],
  [
    {
      ignores: ['dist/', 'node_modules/', '*.json.d.ts'],
    }
  ]
);
