import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CreateCardDto } from '../../card/dto/create-card.dto';
import { SetSwaggerSchemas } from '../schemas/set-swagger.schemas';
import { CreateSetCardValidator } from '../validators/create-set-card.validator';

/**
 * DTO для карточки в сете
 *
 * Поддерживает два варианта:
 * 1. Использование существующей карточки (existingCardId)
 * 2. Создание новой карточки (newCard)
 *
 * @example
 * ```typescript
 * // Использование существующей карточки
 * const existingCardDto: CreateSetCardDto = {
 *   existingCardId: 'card_123'
 * };
 *
 * // Создание новой карточки
 * const newCardDto: CreateSetCardDto = {
 *   newCard: {
 *     term: 'house',
 *     translate: 'дом',
 *     definition: 'Здание для жилья'
 *   }
 * };
 * ```
 */
export class CreateSetCardDto {
  @ApiPropertyOptional(SetSwaggerSchemas.existingCardId)
  @IsOptional()
  @IsString()
  existingCardId?: string;

  @ApiPropertyOptional({ ...SetSwaggerSchemas.newCard, type: CreateCardDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCardDto)
  newCard?: CreateCardDto;

  // Валидация: либо existingCardId, либо newCard должен быть указан
  @Validate(CreateSetCardValidator)
  _?: unknown;
}
