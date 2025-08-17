import { Controller, Get, Param } from '@nestjs/common';
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
}
