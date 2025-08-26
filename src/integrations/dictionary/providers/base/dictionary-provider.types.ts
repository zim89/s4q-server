import { TranscriptionResult, WordInfo } from '../../types';

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
