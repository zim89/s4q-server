/**
 * Основные типы для работы с API словарей
 */

/**
 * Ответ от Free Dictionary API
 */
export interface DictionaryResponse {
  word: string;
  phonetic?: string;
  phonetics?: Array<{
    text?: string;
    audio?: string;
  }>;
  meanings?: Array<{
    partOfSpeech?: string;
    definitions?: Array<{
      definition: string;
      example?: string;
    }>;
  }>;
}

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
