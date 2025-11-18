import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import nextPlugin from '@next/eslint-plugin-next';
import nextTs from 'eslint-config-next/typescript';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      ...nextPlugin.configs.recommended.rules,
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'react-hooks/set-state-in-effect':'warn'
    }
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts'])
]);

export default eslintConfig;
