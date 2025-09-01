/**
 * Общие типы для работы с информацией о словах
 */

/**
 * Метаданные слова
 */
export interface WordMetadata {
  allPartsOfSpeech: string[]; // Все части речи слова
  definitionsCount: number; // Общее количество определений
  meaningsCount: number; // Количество значений
}

/**
 * Семантические связи слова
 */
export interface WordSemantic {
  synonyms: string[]; // Синонимы
  antonyms: string[]; // Антонимы
  relatedWords?: string[]; // Связанные слова
}

/**
 * Общая информация о слове
 */
export interface WordInfo {
  transcription?: string; // Фонетическая транскрипция
  audioUrl?: string; // URL аудио файла
  partOfSpeech?: string; // Часть речи
  source: string; // Источник данных
  origin?: unknown; // Полный ответ от внешнего API
}

/**
 * Информация о слове от Free Dictionary API
 */
export interface FreeDictionaryWordInfo extends WordInfo {
  origin: import('../providers/free-dictionary/free-dictionary.types').FreeDictionaryEntry;
}

/**
 * Информация о слове от Merriam-Webster API
 */
export interface MerriamWebsterWordInfo extends WordInfo {
  origin: import('../providers/merriam-webster/merriam-webster.types').MerriamWebsterResponse;
}

/**
 * Расширенная информация о слове
 */
export interface ExtendedWordInfo extends WordInfo {
  metadata?: WordMetadata;
  semantic?: WordSemantic;
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
