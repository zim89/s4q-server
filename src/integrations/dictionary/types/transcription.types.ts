/**
 * Типы для работы с транскрипцией и аудио
 */

/**
 * Результат получения транскрипции
 */
export interface TranscriptionResult {
  transcription: string; // Фонетическая транскрипция
  audioUrl?: string; // URL аудио файла
  source: string; // Источник данных
}

/**
 * Информация об аудио файле
 */
export interface AudioInfo {
  url: string;
  format?: string;
  duration?: number;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Фонетические данные
 */
export interface PhoneticData {
  text: string;
  audio?: string;
  region?: string;
  accent?: string;
}

/**
 * Результат обработки фонетики
 */
export interface PhoneticResult {
  primary: PhoneticData;
  alternatives?: PhoneticData[];
}
