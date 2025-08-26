import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { envKeys } from 'src/config';
import { dictionaryProviders } from '../../constants';
import { TranscriptionResult, WordInfo } from '../../types';
import { BaseDictionaryProvider } from '../base';
import {
  FreeDictionaryError,
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

  async getWordInfo(word: string): Promise<WordInfo | null> {
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

  private normalizeWordInfo(data: FreeDictionaryResponse[0]): WordInfo {
    const meanings = data.meanings.map(meaning => ({
      partOfSpeech: meaning.partOfSpeech,
      definitions: meaning.definitions.map(def => ({
        definition: def.definition,
        example: def.example,
      })),
    }));

    // Получаем первую доступную транскрипцию и аудио
    const phonetic = data.phonetic ?? data.phonetics[0]?.text ?? '';
    const audioUrl = data.phonetics.find(p => p.audio)?.audio ?? '';

    return {
      transcription: phonetic,
      audioUrl,
      partOfSpeech: meanings[0]?.partOfSpeech,
      source: 'Free Dictionary API',
    };
  }

  private normalizeTranscription(
    data: FreeDictionaryResponse[0]
  ): TranscriptionResult {
    const phonetic = data.phonetic ?? data.phonetics[0]?.text ?? '';
    const audioUrl = data.phonetics.find(p => p.audio)?.audio ?? '';

    return {
      transcription: phonetic,
      audioUrl,
      source: 'Free Dictionary API',
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
