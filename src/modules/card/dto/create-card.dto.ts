import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CardDifficulty, ContentType, PartOfSpeech } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'Слово или фраза для изучения',
    example: 'hello',
  })
  @IsString()
  wordOrPhrase!: string;

  @ApiPropertyOptional({
    description: 'Часть речи',
    enum: PartOfSpeech,
    example: PartOfSpeech.NOUN,
  })
  @IsOptional()
  @IsEnum(PartOfSpeech)
  partOfSpeech?: PartOfSpeech;

  @ApiPropertyOptional({
    description: 'Фонетическая транскрипция',
    example: 'həˈloʊ',
  })
  @IsOptional()
  @IsString()
  transcription?: string;

  @ApiPropertyOptional({
    description: 'URL изображения для карточки',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'URL аудио файла с произношением',
    example: 'https://example.com/audio.mp3',
  })
  @IsOptional()
  @IsString()
  audioUrl?: string;

  @ApiPropertyOptional({
    description: 'Глобальная карточка (доступна всем пользователям)',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean;

  @ApiPropertyOptional({
    description: 'Сложность карточки',
    enum: CardDifficulty,
    example: CardDifficulty.EASY,
  })
  @IsOptional()
  @IsEnum(CardDifficulty)
  difficulty?: CardDifficulty;

  @ApiPropertyOptional({
    description: 'Тип контента карточки',
    enum: ContentType,
    example: ContentType.TEXT,
  })
  @IsOptional()
  @IsEnum(ContentType)
  contentType?: ContentType;
}
