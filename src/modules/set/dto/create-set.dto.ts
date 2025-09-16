import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LanguageLevel } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SetSwaggerSchemas } from '../schemas/set-swagger.schemas';
import { CreateSetCardDto } from './create-set-card.dto';

/**
 * DTO для создания нового набора карточек
 *
 * Используется для создания наборов карточек для изучения языков.
 * Поддерживает различные типы наборов: языковые и пользовательские.
 *
 * @example
 * ```typescript
 * const createSetDto: CreateSetDto = {
 *   name: 'Базовые английские слова',
 *   description: 'Набор базовых английских слов для начинающих',
 *   level: LanguageLevel.A1,
 *   isPublic: true
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Пользовательский набор
 * const createSetDto: CreateSetDto = {
 *   name: 'Мои любимые слова',
 *   description: 'Персональная коллекция интересных слов',
 *   level: LanguageLevel.B2,
 *   isPublic: false
 * };
 * ```
 */
export class CreateSetDto {
  @ApiProperty(SetSwaggerSchemas.name)
  @IsString()
  name!: string;

  @ApiPropertyOptional(SetSwaggerSchemas.description)
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    ...SetSwaggerSchemas.isBase,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isBase?: boolean;

  @ApiPropertyOptional({
    ...SetSwaggerSchemas.isPublic,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional(SetSwaggerSchemas.level)
  @IsOptional()
  @IsEnum(LanguageLevel)
  level?: LanguageLevel;

  @ApiProperty({
    description:
      'Карточки для сета. Могут быть новыми или существующими (минимум 2)',
    type: [CreateSetCardDto],
    minItems: 2,
  })
  @IsArray()
  @ArrayMinSize(2, { message: 'Сет должен содержать минимум 2 карточки' })
  @ValidateNested({ each: true })
  @Type(() => CreateSetCardDto)
  cards!: CreateSetCardDto[];
}
