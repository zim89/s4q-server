import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AxiosRequestConfig } from 'axios';
import { envKeys } from 'src/config/env/keys';
import { dictionaryProviders } from '../../constants';
import { TranscriptionResult, WordInfo } from '../../types';
import { BaseDictionaryProvider } from '../base';
import { MerriamWebsterResponse } from './merriam-webster.types';

/**
 * Сервис для работы с Merriam-Webster API
 *
 * Предоставляет авторитетные данные о словах с определениями,
 * транскрипцией и аудио произношением.
 */
@Injectable()
export class MerriamWebsterDictionaryService extends BaseDictionaryProvider {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(httpService: HttpService, configService: ConfigService) {
    super(httpService, configService, dictionaryProviders.merriamWebster);

    this.apiKey = configService.get<string>(envKeys.MERRIAM_API_KEY) ?? '';
    this.baseUrl =
      configService.get<string>(envKeys.MERRIAM_API_URL) ??
      'https://www.dictionaryapi.com/api/v3/references/collegiate/json';

    if (!this.apiKey) {
      this.logger.warn('Merriam-Webster API key not configured');
      this.deactivate();
    } else {
      this.activate();
    }
  }

  /**
   * Получить информацию о слове из Merriam-Webster API
   */
  async getWordInfo(word: string): Promise<WordInfo | null> {
    try {
      if (!this.isAvailable()) {
        this.logger.warn('Merriam-Webster API is not available');
        return null;
      }

      const response = await this.makeRequest<MerriamWebsterResponse[]>(
        `${this.baseUrl}/${encodeURIComponent(word)}`,
        this.getRequestConfig()
      );

      if (!response || response.length === 0) {
        return null;
      }

      return this.normalizeWordInfo(response[0], word);
    } catch (error) {
      this.logger.error(
        `Error getting word info from Merriam-Webster API for "${word}":`,
        error
      );
      return null;
    }
  }

  /**
   * Получить транскрипцию слова из Merriam-Webster API
   */
  async getTranscription(word: string): Promise<TranscriptionResult | null> {
    try {
      if (!this.isAvailable()) {
        this.logger.warn('Merriam-Webster API is not available');
        return null;
      }

      const response = await this.makeRequest<MerriamWebsterResponse[]>(
        `${this.baseUrl}/${encodeURIComponent(word)}`,
        this.getRequestConfig()
      );

      if (!response || response.length === 0) {
        return null;
      }

      return this.normalizeTranscription(response[0], word);
    } catch (error) {
      this.logger.error(
        `Error getting transcription from Merriam-Webster API for "${word}":`,
        error
      );
      return null;
    }
  }

  /**
   * Получить конфигурацию запроса с API ключом
   */
  private getRequestConfig(): AxiosRequestConfig {
    return {
      params: {
        key: this.apiKey,
      },
    };
  }

  /**
   * Нормализовать данные слова в общий формат
   */
  private normalizeWordInfo(
    response: MerriamWebsterResponse,
    _word: string
  ): WordInfo | null {
    // Получаем транскрипцию
    let transcription: string | undefined;
    if (response.hwi.prs && response.hwi.prs.length > 0) {
      transcription = response.hwi.prs[0].mw;
    }

    // Получаем аудио URL
    let audioUrl: string | undefined;
    if (response.hwi.prs && response.hwi.prs.length > 0) {
      const pronunciation = response.hwi.prs.find(p => p.sound);
      if (pronunciation?.sound) {
        audioUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${pronunciation.sound.audio}/${pronunciation.sound.audio}.mp3`;
      }
    }

    // Получаем часть речи
    const partOfSpeech = response.fl;

    return {
      transcription,
      audioUrl,
      partOfSpeech,
      source: 'Merriam-Webster API',
    };
  }

  /**
   * Получить название провайдера
   */
  getProviderName(): string {
    return dictionaryProviders.merriamWebster;
  }

  /**
   * Нормализовать транскрипцию в общий формат
   */
  private normalizeTranscription(
    response: MerriamWebsterResponse,
    _word: string
  ): TranscriptionResult | null {
    if (!response.hwi.prs || response.hwi.prs.length === 0) {
      return null;
    }

    const pronunciation = response.hwi.prs[0];
    let audioUrl: string | undefined;

    if (pronunciation.sound) {
      audioUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${pronunciation.sound.audio}/${pronunciation.sound.audio}.mp3`;
    }

    return {
      transcription: pronunciation.mw,
      audioUrl,
      source: 'Merriam-Webster API',
    };
  }
}
