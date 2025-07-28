import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**', 'coverage/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Правила сортировки импортов
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Внешние модули (начинаются с букв или @, например, @nestjs/*, zod)
            ['^@?\\w'],
            // 2. Абсолютные импорты из shared (например, src/shared/utils/env.utils)
            ['^src/shared/'],
            // 3. Абсолютные импорты из config (например, src/config/env/env.schema)
            ['^src/config/'],
            // 4. Абсолютные импорты из infrastructure (например, src/infrastructure/prisma/prisma.service)
            ['^src/infrastructure/'],
            // 5. Абсолютные импорты из integrations (например, src/integrations/*)
            ['^src/integrations/'],
            // 6. Абсолютные импорты из api (например, src/api/auth/auth.module)
            ['^src/api/'],
            // 7. Относительные импорты (./, ../) для локальных файлов
            ['^\\./', '^\\../'],
            // 8. Импорты типов (внешние и локальные)
            ['^@?\\w.*\$', '^src/.*\$', '^\\..*\$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/first': 'error', // Импорты должны быть в начале файла
      'import/newline-after-import': 'error', // Пустая строка после импортов
      'import/no-duplicates': 'error', // Запрет дублирующихся импортов
      // Существующие правила
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
