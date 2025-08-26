import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FreeDictionaryService } from './free-dictionary.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [FreeDictionaryService],
  exports: [FreeDictionaryService],
})
export class FreeDictionaryModule {}
