import { ApiProperty } from '@nestjs/swagger';
import { LanguageSwaggerSchemas } from '../schemas/language-swagger.schemas';

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
  @ApiProperty(LanguageSwaggerSchemas.id)
  id!: string;

  @ApiProperty(LanguageSwaggerSchemas.createdAt)
  createdAt!: Date;

  @ApiProperty(LanguageSwaggerSchemas.name)
  name!: string;

  @ApiProperty(LanguageSwaggerSchemas.code)
  code!: string;

  @ApiProperty(LanguageSwaggerSchemas.isEnabled)
  isEnabled!: boolean;
}
