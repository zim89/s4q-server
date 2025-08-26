import { Module } from '@nestjs/common';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';
import { FreeDictionaryModule } from './providers/free-dictionary';
import { MerriamWebsterDictionaryModule } from './providers/merriam-webster';

@Module({
  imports: [MerriamWebsterDictionaryModule, FreeDictionaryModule],
  controllers: [DictionaryController],
  providers: [DictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
