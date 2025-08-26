import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MerriamWebsterDictionaryService } from './merriam-webster.service';

@Module({
  imports: [HttpModule],
  providers: [MerriamWebsterDictionaryService],
  exports: [MerriamWebsterDictionaryService],
})
export class MerriamWebsterDictionaryModule {}
