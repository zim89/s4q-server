import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { envKeys } from 'src/config';
import { dictionaryProviders } from '../../constants';
import {
  ExtendedWordInfo,
  FreeDictionaryWordInfo,
  TranscriptionResult,
} from '../../types';
import { BaseDictionaryProvider } from '../base';
import {
  FreeDictionaryError,
  FreeDictionaryMeaning,
  FreeDictionaryResponse,
} from './free-dictionary.types';

@Injectable()
export class FreeDictionaryService extends BaseDictionaryProvider {
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly retries: number;

  constructor(httpService: HttpService, configService: ConfigService) {
    super(httpService, configService, dictionaryProviders.freeDictionary);

    this.baseUrl = configService.get<string>(
      envKeys.FREE_DICTIONARY_API_URL,
      'https://api.dictionaryapi.dev/api/v2/entries/en'
    );
    this.timeout = configService.get<number>(
      envKeys.FREE_DICTIONARY_API_TIMEOUT,
      5000
    );
    this.retries = configService.get<number>(
      envKeys.FREE_DICTIONARY_API_RETRIES,
      3
    );

    // Free Dictionary API не требует API ключа, поэтому всегда активен
    this.activate();
  }

  async getWordInfo(word: string): Promise<FreeDictionaryWordInfo | null> {
    try {
      this.logger.debug(
        `Fetching word info for "${word}" from Free Dictionary API`
      );

      const response = await firstValueFrom(
        this.httpService.get<FreeDictionaryResponse>(
          `${this.baseUrl}/${encodeURIComponent(word)}`,
          {
            timeout: this.timeout,
          }
        )
      );

      if (!response.data || response.data.length === 0) {
        this.logger.debug(`Word "${word}" not found in Free Dictionary API`);
        return null;
      }

      const wordInfo = this.normalizeWordInfo(response.data[0]);
      this.logger.debug(`Successfully fetched word info for "${word}"`);

      return wordInfo;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.handleApiError(error, word);
      } else {
        this.logger.error(
          `Unexpected error getting word info for "${word}":`,
          error
        );
      }

      return null;
    }
  }

  /**
   * Получить расширенную информацию о слове
   */
  async getExtendedWordInfo(word: string): Promise<ExtendedWordInfo | null> {
    try {
      this.logger.debug(
        `Fetching extended word info for "${word}" from Free Dictionary API`
      );

      const response = await firstValueFrom(
        this.httpService.get<FreeDictionaryResponse>(
          `${this.baseUrl}/${encodeURIComponent(word)}`,
          {
            timeout: this.timeout,
          }
        )
      );

      if (!response.data || response.data.length === 0) {
        this.logger.debug(`Word "${word}" not found in Free Dictionary API`);
        return null;
      }

      const extendedWordInfo = this.normalizeExtendedWordInfo(response.data[0]);
      this.logger.debug(
        `Successfully fetched extended word info for "${word}"`
      );

      return extendedWordInfo;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.handleApiError(error, word);
      } else {
        this.logger.error(
          `Unexpected error getting extended word info for "${word}":`,
          error
        );
      }

      return null;
    }
  }

  async getTranscription(word: string): Promise<TranscriptionResult | null> {
    try {
      this.logger.debug(
        `Fetching transcription for "${word}" from Free Dictionary API`
      );

      const response = await firstValueFrom(
        this.httpService.get<FreeDictionaryResponse>(
          `${this.baseUrl}/${encodeURIComponent(word)}`,
          {
            timeout: this.timeout,
          }
        )
      );

      if (!response.data || response.data.length === 0) {
        this.logger.debug(`Word "${word}" not found in Free Dictionary API`);
        return null;
      }

      const transcription = this.normalizeTranscription(response.data[0]);
      this.logger.debug(`Successfully fetched transcription for "${word}"`);

      return transcription;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.handleApiError(error, word);
      } else {
        this.logger.error(
          `Unexpected error getting transcription for "${word}":`,
          error
        );
      }

      return null;
    }
  }

  getProviderName(): string {
    return dictionaryProviders.freeDictionary;
  }

  private normalizeWordInfo(
    data: FreeDictionaryResponse[0]
  ): FreeDictionaryWordInfo {
    // Получаем первую доступную транскрипцию и аудио
    const phonetic = this.extractPhonetic(data);
    const audioUrl = this.extractAudioUrl(data);

    // Выбираем наиболее важную часть речи
    const partOfSpeech = this.selectPrimaryPartOfSpeech(data.meanings);

    return {
      transcription: phonetic,
      audioUrl,
      partOfSpeech,
      source: 'Free Dictionary API',
      origin: data, // Полный ответ от Free Dictionary API
    };
  }

  private normalizeTranscription(
    data: FreeDictionaryResponse[0]
  ): TranscriptionResult {
    const phonetic = this.extractPhonetic(data);
    const audioUrl = this.extractAudioUrl(data);

    return {
      transcription: phonetic,
      audioUrl,
      source: 'Free Dictionary API',
      origin: data, // Полный ответ от Free Dictionary API
    };
  }

  private extractPhonetic(data: FreeDictionaryResponse[0]): string {
    // Сначала проверяем поле phonetic (если есть)
    if (data.phonetic) {
      return data.phonetic;
    }

    // Затем ищем в массиве phonetics первую запись с текстом
    const phoneticWithText = data.phonetics.find(p => p.text);
    if (phoneticWithText) {
      return phoneticWithText.text;
    }

    return '';
  }

  private extractAudioUrl(data: FreeDictionaryResponse[0]): string {
    // Ищем первую запись с аудио
    const phoneticWithAudio = data.phonetics.find(p => p.audio);
    return phoneticWithAudio?.audio ?? '';
  }

  /**
   * Выбирает наиболее важную часть речи из множественных значений
   *
   * Приоритет: adjective > noun > verb > adverb > preposition > conjunction
   */
  private selectPrimaryPartOfSpeech(meanings: FreeDictionaryMeaning[]): string {
    if (!meanings || meanings.length === 0) {
      return '';
    }

    // Если только одна часть речи, возвращаем её
    if (meanings.length === 1) {
      return meanings[0].partOfSpeech;
    }

    // Приоритет частей речи (от высшего к низшему)
    const priorityOrder = [
      'adjective',
      'noun',
      'verb',
      'adverb',
      'preposition',
      'conjunction',
      'interjection',
      'pronoun',
      'determiner',
      'article',
    ];

    // Ищем часть речи с наивысшим приоритетом
    for (const priority of priorityOrder) {
      const meaning = meanings.find(m => m.partOfSpeech === priority);
      if (meaning) {
        return meaning.partOfSpeech;
      }
    }

    // Если не найдена приоритетная часть речи, возвращаем первую
    return meanings[0].partOfSpeech;
  }

  /**
   * Нормализует данные в расширенный формат
   */
  private normalizeExtendedWordInfo(
    data: FreeDictionaryResponse[0]
  ): ExtendedWordInfo {
    // Базовая информация
    const phonetic = this.extractPhonetic(data);
    const audioUrl = this.extractAudioUrl(data);
    const partOfSpeech = this.selectPrimaryPartOfSpeech(data.meanings);

    // Метаданные
    const metadata = {
      allPartsOfSpeech: data.meanings.map(m => m.partOfSpeech),
      definitionsCount: data.meanings.reduce(
        (sum, m) => sum + m.definitions.length,
        0
      ),
      meaningsCount: data.meanings.length,
    };

    // Семантические связи (объединяем из всех значений)
    const allSynonyms = new Set<string>();
    const allAntonyms = new Set<string>();

    data.meanings.forEach((meaning, index) => {
      console.log(`Meaning ${index}: ${meaning.partOfSpeech}`);
      console.log(`Synonyms:`, meaning.synonyms);
      console.log(`Antonyms:`, meaning.antonyms);

      // Синонимы и антонимы на уровне meaning
      if (meaning.synonyms) {
        meaning.synonyms.forEach(synonym => allSynonyms.add(synonym));
      }
      if (meaning.antonyms) {
        meaning.antonyms.forEach(antonym => allAntonyms.add(antonym));
      }

      // Синонимы и антонимы на уровне definition
      meaning.definitions.forEach(def => {
        if (def.synonyms) {
          def.synonyms.forEach(synonym => allSynonyms.add(synonym));
        }
        if (def.antonyms) {
          def.antonyms.forEach(antonym => allAntonyms.add(antonym));
        }
      });
    });

    console.log(`Final synonyms:`, Array.from(allSynonyms));
    console.log(`Final antonyms:`, Array.from(allAntonyms));

    const semantic = {
      synonyms: Array.from(allSynonyms),
      antonyms: Array.from(allAntonyms),
    };

    return {
      transcription: phonetic,
      audioUrl,
      partOfSpeech,
      source: 'Free Dictionary API',
      origin: data,
      metadata,
      semantic,
    };
  }

  private handleApiError(error: AxiosError, word: string): void {
    const status = error.response?.status;
    const errorData = error.response?.data as FreeDictionaryError;

    switch (status) {
      case 404:
        this.logger.debug(`Free Dictionary API: Word "${word}" not found`);
        break;
      case 429:
        this.logger.warn('Free Dictionary API: Rate limit exceeded');
        break;
      case 500:
        this.logger.error('Free Dictionary API: Internal server error');
        break;
      default:
        this.logger.error(
          `Free Dictionary API error (${status}): ${
            errorData?.message ?? error.message
          }`
        );
    }
  }
}
