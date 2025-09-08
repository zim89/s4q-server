import { ApiPropertyOptional } from '@nestjs/swagger';
import { LanguageLevel, SetType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  SetSortField,
  setSortFieldValues,
  SortOrder,
  sortOrderValues,
} from 'src/shared/constants/sort';
import { PaginationDto } from 'src/shared/dto';

/**
 * DTO для запросов с фильтрацией и пагинацией наборов
 *
 * Расширяет {@link PaginationDto} и добавляет специфичные для наборов фильтры.
 * Используется для получения списка наборов с возможностью фильтрации и сортировки.
 *
 * @example
 * ```typescript
 * const queryDto: SetQueryDto = {
 *   page: 1,
 *   limit: 20,
 *   type: SetType.LANGUAGE,
 *   level: LanguageLevel.A1,
 *   search: 'english',
 *   sort: 'createdAt',
 *   order: 'desc'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Поиск по типу и уровню
 * const queryDto: SetQueryDto = {
 *   type: SetType.CUSTOM,
 *   level: LanguageLevel.B2,
 *   sort: 'name',
 *   order: 'asc'
 * };
 * ```
 */
export class SetQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Тип набора',
    enum: SetType,
    example: SetType.LANGUAGE,
  })
  @IsOptional()
  @IsEnum(SetType)
  type?: SetType;

  @ApiPropertyOptional({
    description: 'Уровень сложности',
    enum: LanguageLevel,
    example: LanguageLevel.A1,
  })
  @IsOptional()
  @IsEnum(LanguageLevel)
  level?: LanguageLevel;

  @ApiPropertyOptional({
    description: 'Поиск по названию',
    example: 'english words',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Поле для сортировки',
    enum: setSortFieldValues,
    example: setSortFieldValues[0],
  })
  @IsOptional()
  @IsEnum(setSortFieldValues)
  sort?: SetSortField;

  @ApiPropertyOptional({
    description: 'Порядок сортировки',
    enum: sortOrderValues,
    example: sortOrderValues[1],
  })
  @IsOptional()
  @IsEnum(sortOrderValues)
  order?: SortOrder;
}
