import { Module } from '@nestjs/common';
import { DictionaryModule } from 'src/integrations/dictionary';
import {
  ContentAnalyzerService,
  DifficultyCalculatorService,
} from 'src/shared/services';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [DictionaryModule],
  controllers: [CardController],
  providers: [CardService, DifficultyCalculatorService, ContentAnalyzerService],
  exports: [CardService],
})
export class CardModule {}
