import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LanguageLevel } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

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
}
