import { TranscriptionResult, WordInfo } from '../types';

/**
 * Доступные провайдеры словарей
 */
export const dictionaryProviders = {
  merriamWebster: 'merriam-webster',
  merriamIntermediate: 'merriam-intermediate',
  freeDictionary: 'free-dictionary',
} as const;

/**
 * Тип для провайдеров словарей
 */
export type DictionaryProviderType =
  (typeof dictionaryProviders)[keyof typeof dictionaryProviders];

/**
 * Конфигурация провайдеров
 */
export const providerConfig = {
  [dictionaryProviders.merriamWebster]: {
    name: 'Merriam-Webster Collegiate',
    description: 'Авторитетный словарь с 225,000+ определениями и аудио',
    baseUrl: 'https://dictionaryapi.com/api/v3/references/collegiate/json',
    requiresApiKey: true,
    monthlyLimit: Infinity, // Бесплатно для некоммерческого использования
    supportedLanguages: ['en'],
  },
  [dictionaryProviders.merriamIntermediate]: {
    name: 'Merriam-Webster Intermediate',
    description:
      'Словарь для школьников 6-8 классов с упрощенными определениями',
    baseUrl: 'https://dictionaryapi.com/api/v3/references/sd3/json',
    requiresApiKey: true,
    monthlyLimit: Infinity, // Бесплатно для некоммерческого использования
    supportedLanguages: ['en'],
  },
  [dictionaryProviders.freeDictionary]: {
    name: 'Free Dictionary API',
    description: 'Бесплатный API без лимитов',
    baseUrl: 'https://api.dictionaryapi.dev/api/v2/entries',
    requiresApiKey: false,
    monthlyLimit: Infinity,
    supportedLanguages: ['en'],
  },
} as const;

/**
 * Тип для конфигурации провайдера
 */
export type ProviderConfig = (typeof providerConfig)[DictionaryProviderType];

/**
 * Интерфейс для провайдеров словарей
 *
 * Определяет общий контракт для всех сервисов словарей
 */
export interface DictionaryProvider {
  /**
   * Получить информацию о слове
   *
   * @param word - Слово для поиска
   * @returns Информация о слове или null если не найдено
   */
  getWordInfo(word: string): Promise<WordInfo | null>;

  /**
   * Получить транскрипцию слова
   *
   * @param word - Слово для получения транскрипции
   * @returns Результат транскрипции или null если не найдено
   */
  getTranscription(word: string): Promise<TranscriptionResult | null>;

  /**
   * Проверить доступность провайдера
   *
   * @returns true если провайдер доступен
   */
  isAvailable(): boolean;

  /**
   * Получить название провайдера
   *
   * @returns Название провайдера
   */
  getName(): string;

  /**
   * Получить статус провайдера
   *
   * @returns Статус провайдера
   */
  getStatus(): ProviderStatus;
}

/**
 * Статус провайдера
 */
export interface ProviderStatus {
  name: string;
  isAvailable: boolean;
  isActive: boolean;
  lastCheck?: Date;
  errorCount: number;
  successCount: number;
  averageResponseTime?: number;
}
