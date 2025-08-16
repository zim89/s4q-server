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
      // 🔒 Запрет any - строгая типизация
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',

      // 🚫 Неиспользуемые переменные и импорты
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': 'off', // Отключаем базовое правило в пользу TypeScript версии
      'import/no-unused-modules': 'error',

      // 🔄 Promise и async/await
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',

      // 📝 Сортировка импортов
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
            // 6. Абсолютные импорты из modules (например, src/modules/auth/auth.module)
            ['^src/modules/'],
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

      // 🛡️ Дополнительные правила безопасности
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',

      // 📋 Стиль кода
      'prefer-const': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off', // Можно включить для строгости
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Можно включить для строгости
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',

      // 🔍 Логические ошибки
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
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
