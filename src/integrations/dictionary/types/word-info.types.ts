/**
 * Общие типы для работы с информацией о словах
 */

/**
 * Общая информация о слове
 */
export interface WordInfo {
  transcription?: string; // Фонетическая транскрипция
  audioUrl?: string; // URL аудио файла
  partOfSpeech?: string; // Часть речи
  source: string; // Источник данных
}

/**
 * Типы ошибок API
 */
export interface DictionaryError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * Конфигурация провайдера
 */
export interface DictionaryProviderConfig {
  baseUrl: string;
  timeout?: number;
  retries?: number;
}
