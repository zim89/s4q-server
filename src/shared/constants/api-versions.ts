/**
 * API Version Constants
 *
 * Централизованное управление версиями API эндпоинтов.
 * Все версии API должны быть определены здесь для консистентности.
 */

/** Версия приложения */
export const APP_VERSION = '0.0.1' as const;

export const apiVersions = {
  /** Основные версии API */
  v0: '0',
  v1: '1',
  v2: '2',
  v3: '3',

  /** Стабильные версии (для продакшена) */
  stable: '0',

  // Экспериментальные версии (для тестирования)
  experimental: '1',

  // Будущие версии (в разработке)
  beta: '2',
  alpha: '3',
} as const;

/**
 * Версии по модулям
 * Каждый модуль может иметь свою версию API
 */
export const moduleVersions = {
  /** Аутентификация */
  auth: {
    current: apiVersions.v0,
    stable: apiVersions.v0,
    experimental: apiVersions.v1,
  },

  /** Пользователи */
  user: {
    current: apiVersions.v0,
    stable: apiVersions.v0,
  },

  /** Наборы карточек */
  set: {
    current: apiVersions.v0,
    stable: apiVersions.v0,
  },

  /** Карточки */
  card: {
    current: apiVersions.v0,
    stable: apiVersions.v0,
  },

  /** Изучение */
  study: {
    current: apiVersions.v0,
    stable: apiVersions.v0,
  },

  /** Папки */
  folder: {
    current: apiVersions.v0,
    stable: apiVersions.v0,
  },

  /** Языки */
  language: {
    current: apiVersions.v0,
    stable: apiVersions.v0,
  },

  /** Достижения */
  achievement: {
    current: apiVersions.v0,
    stable: apiVersions.v0,
  },
} as const;

/**
 * Типы для TypeScript
 */
export type ApiVersion = (typeof apiVersions)[keyof typeof apiVersions];
export type ModuleName = keyof typeof moduleVersions;

/**
 * Утилиты для работы с версиями
 */
export const versionUtils = {
  /**
   * Получить текущую версию для модуля
   */
  getCurrentVersion(module: ModuleName): ApiVersion {
    return moduleVersions[module].current;
  },

  /**
   * Получить стабильную версию для модуля
   */
  getStableVersion(module: ModuleName): ApiVersion {
    return moduleVersions[module].stable;
  },

  /**
   * Проверить, является ли версия стабильной
   */
  isStableVersion(version: ApiVersion): boolean {
    return version === apiVersions.stable;
  },

  /**
   * Получить все доступные версии для модуля
   */
  getAvailableVersions(module: ModuleName): ApiVersion[] {
    const versions = moduleVersions[module];
    return Object.values(versions).filter(
      (version, index, arr) => arr.indexOf(version) === index
    );
  },

  /**
   * Сравнить версии
   */
  compareVersions(v1: ApiVersion, v2: ApiVersion): number {
    const num1 = parseInt(v1, 10);
    const num2 = parseInt(v2, 10);
    return num1 - num2;
  },

  /**
   * Проверить, поддерживается ли версия
   */
  isVersionSupported(version: ApiVersion): boolean {
    return Object.values(apiVersions).includes(version);
  },
};

/**
 * Конфигурация версионирования
 */
export const versionConfig = {
  // Включить версионирование API
  enabled: true,

  // Версия по умолчанию
  default: apiVersions.v0,

  // Поддерживаемые версии
  supported: [apiVersions.v0, apiVersions.v1],

  // Устаревшие версии (будут удалены в следующем major релизе)
  deprecated: [] as ApiVersion[],

  // Версии в разработке
  inDevelopment: [apiVersions.v2, apiVersions.v3] as ApiVersion[],
} as const;

/**
 * Декораторы для удобного использования версий
 */
export const apiVersionDecorators = {
  /**
   * Декоратор для текущей версии модуля
   */
  current: (module: ModuleName) => versionUtils.getCurrentVersion(module),

  /**
   * Декоратор для стабильной версии модуля
   */
  stable: (module: ModuleName) => versionUtils.getStableVersion(module),

  /**
   * Декоратор для экспериментальной версии
   */
  experimental: () => apiVersions.experimental,

  /**
   * Декоратор для бета версии
   */
  beta: () => apiVersions.beta,
} as const;
