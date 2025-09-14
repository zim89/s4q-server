import { ApiProperty } from '@nestjs/swagger';
import {
  CardDifficulty,
  ContentAccess,
  ContentStatus,
  ContentType,
  LanguageLevel,
  MediaType,
  PartOfSpeech,
  UserRole,
  VerbType,
} from '@prisma/client';

/**
 * Централизованные схемы для Swagger документации
 *
 * Этот файл содержит все Response DTO для автоматического сканирования Swagger.
 * Все DTO должны быть экспортированы, чтобы Swagger мог их найти.
 */

// Re-export всех Response DTO
export { CardResponseDto } from '../../modules/card/dto/card-response.dto';
export { LanguageResponseDto } from '../../modules/language/dto/language-response.dto';
export { SetResponseDto } from '../../modules/set/dto/set-response.dto';
export { UserResponseDto } from '../../modules/user/dto/user-response.dto';

/**
 * Enum схемы для Swagger
 *
 * Эти классы используются только для Swagger документации
 * и не должны использоваться в реальном коде.
 */

export class LanguageLevelSchema {
  @ApiProperty({
    enum: LanguageLevel,
    description: 'Уровень сложности языка (A1, A2, B1, B2, C1, C2)',
    example: LanguageLevel.A1,
  })
  level!: LanguageLevel;
}

export class ContentStatusSchema {
  @ApiProperty({
    enum: ContentStatus,
    description: 'Статус контента в системе',
    example: ContentStatus.PUBLISHED,
  })
  status!: ContentStatus;
}

export class ContentTypeSchema {
  @ApiProperty({
    enum: ContentType,
    description: 'Тип контента',
    example: ContentType.LANGUAGE,
  })
  type!: ContentType;
}

export class CardDifficultySchema {
  @ApiProperty({
    enum: CardDifficulty,
    description: 'Сложность карточки',
    example: CardDifficulty.EASY,
  })
  difficulty!: CardDifficulty;
}

export class PartOfSpeechSchema {
  @ApiProperty({
    enum: PartOfSpeech,
    description: 'Часть речи',
    example: PartOfSpeech.NOUN,
  })
  partOfSpeech!: PartOfSpeech;
}

export class VerbTypeSchema {
  @ApiProperty({
    enum: VerbType,
    description: 'Тип глагола',
    example: VerbType.REGULAR,
  })
  verbType!: VerbType;
}

export class UserRoleSchema {
  @ApiProperty({
    enum: UserRole,
    description: 'Роль пользователя в системе',
    example: UserRole.USER,
  })
  role!: UserRole;
}

export class ContentAccessSchema {
  @ApiProperty({
    enum: ContentAccess,
    description: 'Уровень доступа к контенту',
    example: ContentAccess.PUBLIC,
  })
  access!: ContentAccess;
}

export class MediaTypeSchema {
  @ApiProperty({
    enum: MediaType,
    description: 'Тип медиа файла',
    example: MediaType.IMAGE_JPG,
  })
  mediaType!: MediaType;
}
