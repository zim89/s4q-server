import { ApiPropertyOptional } from '@nestjs/swagger';
import { CardDifficulty, PartOfSpeech } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  CardSortField,
  cardSortFieldValues,
  SortOrder,
  sortOrderValues,
} from 'src/shared/constants/sort';
import { PaginationDto } from 'src/shared/dto';

/**
 * DTO для запросов с фильтрацией и пагинацией карточек
 *
 * Расширяет {@link PaginationDto} и добавляет специфичные для карточек фильтры.
 * Используется для получения списка карточек с возможностью фильтрации и сортировки.
 *
 * @example
 * ```typescript
 * const queryDto: CardQueryDto = {
 *   page: 1,
 *   limit: 20,
 *   difficulty: CardDifficulty.EASY,
 *   partOfSpeech: PartOfSpeech.NOUN,
 *   search: 'hello',
 *   sort: 'createdAt',
 *   order: 'desc'
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Поиск по сложности
 * const queryDto: CardQueryDto = {
 *   difficulty: CardDifficulty.MEDIUM,
 *   sort: 'term',
 *   order: 'asc'
 * };
 * ```
 */
export class CardQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Сложность карточки',
    enum: CardDifficulty,
    example: CardDifficulty.EASY,
  })
  @IsOptional()
  @IsEnum(CardDifficulty)
  difficulty?: CardDifficulty;

  @ApiPropertyOptional({
    description: 'Часть речи',
    enum: PartOfSpeech,
    example: PartOfSpeech.NOUN,
  })
  @IsOptional()
  @IsEnum(PartOfSpeech)
  partOfSpeech?: PartOfSpeech;

  @ApiPropertyOptional({
    description: 'Поиск по слову или фразе',
    example: 'hello',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Поле для сортировки',
    enum: cardSortFieldValues,
    example: cardSortFieldValues[0],
  })
  @IsOptional()
  @IsEnum(cardSortFieldValues)
  sort?: CardSortField;

  @ApiPropertyOptional({
    description: 'Порядок сортировки',
    enum: sortOrderValues,
    example: sortOrderValues[0],
  })
  @IsOptional()
  @IsEnum(sortOrderValues)
  order?: SortOrder;
}
