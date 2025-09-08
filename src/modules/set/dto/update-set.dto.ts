import { PartialType } from '@nestjs/swagger';
import { CreateSetDto } from './create-set.dto';

/**
 * DTO для обновления набора
 *
 * Расширяет {@link CreateSetDto}, делая все поля опциональными.
 * Используется для частичного обновления наборов.
 *
 * @example
 * ```typescript
 * const updateSetDto: UpdateSetDto = {
 *   name: 'Обновленное название',
 *   description: 'Обновленное описание',
 *   level: LanguageLevel.A2
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Изменение видимости
 * const updateSetDto: UpdateSetDto = {
 *   isPublic: true,
 * };
 * ```
 */
export class UpdateSetDto extends PartialType(CreateSetDto) {}
