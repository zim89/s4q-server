import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { envKeys } from 'src/config/env/keys';
import { DictionaryResponse, TranscriptionResult, WordInfo } from './types';

/**
 * Сервис для работы с внешними API словарей
 *
 * Предоставляет методы для получения транскрипции и другой информации о словах
 * из различных источников (Free Dictionary API, Oxford API, etc.)
 */
@Injectable()
export class DictionaryService {
  private readonly logger = new Logger(DictionaryService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  private get baseUrl(): string {
    return (
      this.configService.get<string>(envKeys.FREE_DICTIONARY_API_URL) ??
      'https://api.dictionaryapi.dev/api/v2/entries/en'
    );
  }

  /**
   * Получить транскрипцию слова из Free Dictionary API
   *
   * @param word - Слово для получения транскрипции
   * @returns Объект с транскрипцией и аудио URL
   */
  async getTranscription(word: string): Promise<TranscriptionResult | null> {
    try {
      const response: AxiosResponse<DictionaryResponse[]> =
        await firstValueFrom(
          this.httpService.get<DictionaryResponse[]>(
            `${this.baseUrl}/${encodeURIComponent(word)}`
          )
        );

      const data: DictionaryResponse[] = response.data;
      if (!data || data.length === 0) {
        this.logger.warn(`Транскрипция не найдена для слова: ${word}`);
        return null;
      }

      const wordData = data[0];
      if (!wordData) {
        this.logger.warn(`Данные слова не найдены для: ${word}`);
        return null;
      }

      // Ищем транскрипцию в различных полях
      let transcription = wordData.phonetic;

      if (!transcription && wordData.phonetics) {
        // Ищем первую доступную транскрипцию
        const phonetic = wordData.phonetics.find(p => p.text);
        transcription = phonetic?.text;
      }

      // Ищем аудио URL
      let audioUrl: string | undefined;
      if (wordData.phonetics) {
        const audioPhonetic = wordData.phonetics.find(p => p.audio);
        audioUrl = audioPhonetic?.audio;
      }

      if (!transcription) {
        this.logger.warn(`Транскрипция не найдена для слова: ${word}`);
        return null;
      }

      return {
        transcription,
        audioUrl,
        source: 'Free Dictionary API',
      };
    } catch (error) {
      this.logger.error(
        `Ошибка при получении транскрипции для слова "${word}":`,
        error
      );
      return null;
    }
  }

  /**
   * Получить информацию о слове (транскрипция + часть речи)
   *
   * @param word - Слово для получения информации
   * @returns Объект с транскрипцией и частью речи
   */
  async getWordInfo(word: string): Promise<WordInfo | null> {
    try {
      const response: AxiosResponse<DictionaryResponse[]> =
        await firstValueFrom(
          this.httpService.get<DictionaryResponse[]>(
            `${this.baseUrl}/${encodeURIComponent(word)}`
          )
        );

      const data: DictionaryResponse[] = response.data;
      if (!data || data.length === 0) {
        return null;
      }

      const wordData = data[0];
      if (!wordData) {
        return null;
      }

      // Получаем транскрипцию
      let transcription = wordData.phonetic;
      if (!transcription && wordData.phonetics) {
        const phonetic = wordData.phonetics.find(p => p.text);
        transcription = phonetic?.text;
      }

      // Получаем аудио URL
      let audioUrl: string | undefined;
      if (wordData.phonetics) {
        const audioPhonetic = wordData.phonetics.find(p => p.audio);
        audioUrl = audioPhonetic?.audio;
      }

      // Получаем часть речи
      let partOfSpeech: string | undefined;
      if (wordData.meanings && wordData.meanings.length > 0) {
        partOfSpeech = wordData.meanings[0].partOfSpeech;
      }

      return {
        transcription,
        audioUrl,
        partOfSpeech,
        source: 'Free Dictionary API',
      };
    } catch (error) {
      this.logger.error(
        `Ошибка при получении информации о слове "${word}":`,
        error
      );
      return null;
    }
  }
}
