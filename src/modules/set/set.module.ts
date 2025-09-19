import { Module } from '@nestjs/common';
import { CardModule } from '../card/card.module';
import { IrregularVerbModule } from '../irregular-verb';
import { SetController } from './set.controller';
import { SetService } from './set.service';

@Module({
  imports: [CardModule, IrregularVerbModule],
  controllers: [SetController],
  providers: [SetService],
})
export class SetModule {}
