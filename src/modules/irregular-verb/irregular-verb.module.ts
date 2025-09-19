import { Module } from '@nestjs/common';
import { IrregularVerbController } from './irregular-verb.controller';
import { IrregularVerbService } from './irregular-verb.service';

@Module({
  controllers: [IrregularVerbController],
  providers: [IrregularVerbService],
  exports: [IrregularVerbService],
})
export class IrregularVerbModule {}
