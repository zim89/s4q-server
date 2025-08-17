import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentCategory, LanguageLevel, SetType } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateSetDto {
  @ApiProperty({
    description: 'Название набора',
    example: 'Базовые английские слова',
  })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    description: 'Описание набора',
    example: 'Набор базовых английских слов для начинающих',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Тип набора',
    enum: SetType,
    default: SetType.LANGUAGE,
  })
  @IsOptional()
  @IsEnum(SetType)
  type?: SetType;

  @ApiPropertyOptional({
    description: 'Базовый набор (системный)',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isBase?: boolean;

  @ApiPropertyOptional({
    description: 'Публичный набор (доступен всем)',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional({
    description: 'Уровень сложности набора',
    enum: LanguageLevel,
    example: LanguageLevel.A1,
  })
  @IsOptional()
  @IsEnum(LanguageLevel)
  level?: LanguageLevel;

  @ApiPropertyOptional({
    description: 'Категория контента набора',
    enum: ContentCategory,
    example: ContentCategory.EDUCATIONAL,
  })
  @IsOptional()
  @IsEnum(ContentCategory)
  contentCategory?: ContentCategory;
}
