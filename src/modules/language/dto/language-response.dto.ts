import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для ответа с данными языка
 *
 * Используется в Swagger документации для описания структуры ответов API.
 * Содержит все поля модели Language с подробными описаниями.
 *
 * @example
 * ```typescript
 * const languageResponse: LanguageResponseDto = {
 *   id: 'cmfier0t20000p4hnsruuys01',
 *   createdAt: '2025-01-13T15:15:11.702Z',
 *   name: 'English',
 *   code: 'en',
 *   isEnabled: true
 * };
 * ```
 */
export class LanguageResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор языка',
    example: 'cmfier0t20000p4hnsruuys01',
  })
  id!: string;

  @ApiProperty({
    description: 'Дата и время создания языка',
    example: '2025-01-13T15:15:11.702Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Название языка',
    example: 'English',
  })
  name!: string;

  @ApiProperty({
    description: 'Код языка (ISO 639-1)',
    example: 'en',
  })
  code!: string;

  @ApiProperty({
    description: 'Включен ли язык в системе',
    example: true,
  })
  isEnabled!: boolean;
}
