import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { dictionaryProviders } from './constants';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get('transcription/:word')
  async getTranscription(@Param('word') word: string) {
    return this.dictionaryService.getTranscription(word);
  }

  @Get('word/:word')
  async getWordInfo(@Param('word') word: string) {
    return this.dictionaryService.getWordInfo(word);
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Dictionary API',
    };
  }

  /**
   * Получить статус всех провайдеров
   */
  @Get('providers/status')
  getProvidersStatus() {
    return this.dictionaryService.getProvidersStatus();
  }

  /**
   * Получить текущего активного провайдера
   */
  @Get('providers/current')
  getCurrentProvider() {
    return {
      provider: this.dictionaryService.getCurrentProvider(),
    };
  }

  /**
   * Переключить активного провайдера
   */
  @Post('providers/switch')
  switchProvider(@Body() body: { provider: string }) {
    const previousProvider = this.dictionaryService.getCurrentProvider();
    this.dictionaryService.switchProvider(body.provider);
    const currentProvider = this.dictionaryService.getCurrentProvider();

    return {
      message:
        currentProvider === body.provider
          ? `Successfully switched to provider: ${body.provider}`
          : `Failed to switch to provider: ${body.provider} (not available). Current provider: ${currentProvider}`,
      previousProvider,
      requestedProvider: body.provider,
      currentProvider,
    };
  }

  /**
   * Получить список доступных провайдеров
   */
  @Get('providers/available')
  getAvailableProviders() {
    return {
      providers: Object.values(dictionaryProviders),
      current: this.dictionaryService.getCurrentProvider(),
    };
  }
}
