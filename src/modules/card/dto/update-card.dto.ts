import { PartialType } from '@nestjs/swagger';
import { CreateCardDto } from './create-card.dto';

/**
 * DTO для обновления карточки
 *
 * Расширяет {@link CreateCardDto}, делая все поля опциональными.
 * Используется для частичного обновления карточек.
 *
 * @example
 * ```typescript
 * const updateCardDto: UpdateCardDto = {
 *   transcription: 'həˈloʊ',
 *   difficulty: CardDifficulty.MEDIUM
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Обновление с изображением
 * const updateCardDto: UpdateCardDto = {
 *   imageUrl: 'https://example.com/new-image.jpg',
 *   audioUrl: 'https://example.com/new-audio.mp3'
 * };
 * ```
 */
export class UpdateCardDto extends PartialType(CreateCardDto) {}
