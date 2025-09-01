import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { envKeys } from 'src/config';
import { dictionaryProviders } from './constants';
import { FreeDictionaryService } from './providers/free-dictionary/free-dictionary.service';
import { MerriamWebsterDictionaryService } from './providers/merriam-webster/merriam-webster.service';
import { TranscriptionResult, WordInfo } from './types';

/**
 * Фасад сервис для работы с провайдерами словарей
 *
 * Предоставляет единый интерфейс для получения информации о словах
 * с автоматическим переключением между провайдерами
 */
@Injectable()
export class DictionaryService {
  private readonly logger = new Logger(DictionaryService.name);
  private currentProviderName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly freeDictionaryService: FreeDictionaryService,
    private readonly merriamService: MerriamWebsterDictionaryService
  ) {
    // Устанавливаем активного провайдера по умолчанию
    this.currentProviderName =
      this.configService.get<string>(envKeys.DICTIONARY_PROVIDER) ??
      dictionaryProviders.merriamWebster;

    this.logger.log(`Active dictionary provider: ${this.currentProviderName}`);
  }

  /**
   * Получить информацию о слове
   *
   * @param word - Слово для получения информации
   * @returns Объект с информацией о слове
   */
  async getWordInfo(word: string): Promise<WordInfo | null> {
    try {
      // Если текущий провайдер - Free Dictionary, возвращаем расширенную информацию
      if (this.currentProviderName === dictionaryProviders.freeDictionary) {
        const extendedResult =
          await this.freeDictionaryService.getExtendedWordInfo(word);
        if (extendedResult) {
          return extendedResult;
        }
      }

      // Пробуем текущего провайдера
      const result = await this.getCurrentProviderService().getWordInfo(word);
      if (result) {
        return result;
      }

      // Если не получилось, пробуем других провайдеров
      const fallbackResult = await this.tryFallbackProviders(
        word,
        'getWordInfo'
      );
      if (fallbackResult) {
        return fallbackResult as WordInfo;
      }

      return null;
    } catch (error) {
      this.logger.error(`Error getting word info for "${word}":`, error);
      return null;
    }
  }

  /**
   * Получить транскрипцию слова
   *
   * @param word - Слово для получения транскрипции
   * @returns Объект с транскрипцией
   */
  async getTranscription(word: string): Promise<TranscriptionResult | null> {
    try {
      // Пробуем текущего провайдера
      const result =
        await this.getCurrentProviderService().getTranscription(word);
      if (result) {
        return result;
      }

      // Если не получилось, пробуем других провайдеров
      const fallbackResult = await this.tryFallbackProviders(
        word,
        'getTranscription'
      );
      if (fallbackResult) {
        return fallbackResult as TranscriptionResult;
      }

      return null;
    } catch (error) {
      this.logger.error(`Error getting transcription for "${word}":`, error);
      return null;
    }
  }

  /**
   * Переключить активного провайдера
   *
   * @param providerName - Название провайдера
   */
  switchProvider(providerName: string): void {
    if (this.isProviderAvailable(providerName)) {
      this.currentProviderName = providerName;
      this.logger.log(`Switched to provider: ${providerName}`);
    } else {
      this.logger.warn(`Provider ${providerName} is not available`);
    }
  }

  /**
   * Получить статус всех провайдеров
   */
  getProvidersStatus(): Record<string, unknown> {
    return {
      [dictionaryProviders.freeDictionary]: {
        name: this.freeDictionaryService.getProviderName(),
        isAvailable: this.freeDictionaryService.isAvailable(),
        isActive:
          this.currentProviderName === dictionaryProviders.freeDictionary,
        status: this.freeDictionaryService.getStatus(),
      },
      [dictionaryProviders.merriamWebster]: {
        name: this.merriamService.getProviderName(),
        isAvailable: this.merriamService.isAvailable(),
        isActive:
          this.currentProviderName === dictionaryProviders.merriamWebster,
        status: this.merriamService.getStatus(),
      },
      [dictionaryProviders.merriamIntermediate]: {
        name: 'Merriam-Webster Intermediate',
        isAvailable: false, // Пока не реализован
        isActive: false,
        status: {
          errorCount: 0,
          successCount: 0,
          averageResponseTime: null,
        },
      },
    };
  }

  /**
   * Получить текущего активного провайдера
   */
  getCurrentProvider(): string {
    return this.currentProviderName;
  }

  /**
   * Получить текущий провайдер сервис
   */
  private getCurrentProviderService() {
    switch (this.currentProviderName) {
      case dictionaryProviders.freeDictionary:
        return this.freeDictionaryService;
      case dictionaryProviders.merriamWebster:
        return this.merriamService;
      default:
        return this.merriamService;
    }
  }

  /**
   * Проверить доступность провайдера
   */
  private isProviderAvailable(providerName: string): boolean {
    switch (providerName) {
      case dictionaryProviders.freeDictionary:
        return this.freeDictionaryService.isAvailable();
      case dictionaryProviders.merriamWebster:
        return this.merriamService.isAvailable();
      case dictionaryProviders.merriamIntermediate:
        return false; // Пока не реализован
      default:
        return false;
    }
  }

  /**
   * Попробовать другие провайдеры
   */
  private async tryFallbackProviders(
    word: string,
    method: 'getWordInfo' | 'getTranscription'
  ) {
    const providers = [
      {
        name: dictionaryProviders.merriamWebster,
        service: this.merriamService,
      },
      {
        name: dictionaryProviders.freeDictionary,
        service: this.freeDictionaryService,
      },
    ];

    for (const provider of providers) {
      if (provider.name === this.currentProviderName) continue;

      if (provider.service.isAvailable()) {
        this.logger.log(`Switching to provider: ${provider.name}`);

        // Для Free Dictionary возвращаем расширенную информацию
        if (
          provider.name === dictionaryProviders.freeDictionary &&
          method === 'getWordInfo'
        ) {
          const result =
            await this.freeDictionaryService.getExtendedWordInfo(word);
          if (result) {
            this.currentProviderName = provider.name;
            return result;
          }
        } else {
          const result = await provider.service[method](word);
          if (result) {
            this.currentProviderName = provider.name;
            return result;
          }
        }
      }
    }

    return null;
  }
}
