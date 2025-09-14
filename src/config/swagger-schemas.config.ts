import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
 * Настройка Swagger с автоматическим сканированием всех схем
 *
 * Сканирует все DTO и добавляет Prisma enum'ы в Swagger документацию
 *
 * @param app - NestJS application instance
 */
export function setupSwaggerWithSchemas(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Space4Quiz API')
    .setDescription(
      'API documentation for Space4Quiz with all models and enums'
    )
    .setVersion('1.0.0')
    .setContact('zim89', 'https://github.com/zim89', 'zi89.dev@gmail.com')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Добавляем все схемы в документацию
  document.components = document.components ?? {};
  document.components.schemas = document.components.schemas ?? {};

  // Добавляем Response DTO схемы с префиксами для группировки
  const responseSchemas = {
    '📋 DTOs - CardResponseDto': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        term: { type: 'string', example: 'beautiful' },
        slug: { type: 'string', example: 'beautiful' },
        translate: { type: 'string', example: 'красивый' },
        definition: { type: 'string', example: 'Pleasing to the senses' },
        partOfSpeech: { $ref: '#/components/schemas/🔢 Enums - PartOfSpeech' },
        transcription: { type: 'string', example: 'ˈbjuːtɪfəl' },
        imageUrl: { type: 'string', example: 'https://example.com/image.jpg' },
        audioUrl: { type: 'string', example: 'https://example.com/audio.mp3' },
        isGlobal: { type: 'boolean', example: true },
        grammaticalGender: { type: 'string', example: 'MASCULINE' },
        difficulty: { $ref: '#/components/schemas/🔢 Enums - CardDifficulty' },
        contentType: { $ref: '#/components/schemas/🔢 Enums - ContentType' },
        contentStatus: {
          $ref: '#/components/schemas/🔢 Enums - ContentStatus',
        },
        userId: { type: 'string', example: 'cmfier0t20000p4hnsruuys02' },
        languageId: { type: 'string', example: 'cmfier0t20000p4hnsruuys03' },
        level: { $ref: '#/components/schemas/🔢 Enums - LanguageLevel' },
        ruleId: { type: 'string', example: 'cmfier0t20000p4hnsruuys04' },
        verbType: { $ref: '#/components/schemas/🔢 Enums - VerbType' },
        irregularVerbId: {
          type: 'string',
          example: 'cmfier0t20000p4hnsruuys05',
        },
        sourceProvider: { type: 'string', example: 'dictionary-api' },
        sourceId: { type: 'string', example: 'dict-12345' },
        studyCount: { type: 'number', example: 15 },
        viewCount: { type: 'number', example: 42 },
        lastUsedAt: { type: 'string', format: 'date-time' },
      },
    },
    '📋 DTOs - SetResponseDto': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        name: { type: 'string', example: 'Базовые английские слова' },
        slug: { type: 'string', example: 'basic-english-words' },
        description: {
          type: 'string',
          example: 'Набор базовых английских слов',
        },
        isBase: { type: 'boolean', example: false },
        isPublic: { type: 'boolean', example: true },
        userId: { type: 'string', example: 'cmfier0t20000p4hnsruuys02' },
        languageId: { type: 'string', example: 'cmfier0t20000p4hnsruuys03' },
        level: { $ref: '#/components/schemas/🔢 Enums - LanguageLevel' },
        contentStatus: {
          $ref: '#/components/schemas/🔢 Enums - ContentStatus',
        },
        originalSetId: { type: 'string', example: 'cmfier0t20000p4hnsruuys04' },
      },
    },
    '📋 DTOs - LanguageResponseDto': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        createdAt: { type: 'string', format: 'date-time' },
        name: { type: 'string', example: 'English' },
        code: { type: 'string', example: 'en' },
        isEnabled: { type: 'boolean', example: true },
      },
    },
    '📋 DTOs - UserResponseDto': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        email: { type: 'string', example: 'user@example.com' },
        username: { type: 'string', example: 'john_doe' },
        firstName: { type: 'string', example: 'John' },
        lastName: { type: 'string', example: 'Doe' },
        role: { $ref: '#/components/schemas/🔢 Enums - UserRole' },
        isActive: { type: 'boolean', example: true },
        lastLoginAt: { type: 'string', format: 'date-time' },
        avatarUrl: {
          type: 'string',
          example: 'https://example.com/avatar.jpg',
        },
      },
    },
  };

  // Response DTO схемы уже имеют префиксы для группировки

  // Добавляем Response DTO в схемы
  Object.assign(document.components.schemas, responseSchemas);

  // Добавляем Prisma модели с префиксами для группировки
  const prismaModels = {
    '🗄️ Prisma Models - User': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        email: { type: 'string', example: 'user@example.com' },
        username: { type: 'string', example: 'john_doe' },
        firstName: { type: 'string', example: 'John' },
        lastName: { type: 'string', example: 'Doe' },
        role: { $ref: '#/components/schemas/🔢 Enums - UserRole' },
        isActive: { type: 'boolean', example: true },
        lastLoginAt: { type: 'string', format: 'date-time' },
        avatarUrl: {
          type: 'string',
          example: 'https://example.com/avatar.jpg',
        },
        // Связи
        cards: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Card' },
        },
        sets: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Set' },
        },
        userCards: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - UserCard' },
        },
        userSets: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - UserSet' },
        },
      },
    },
    '🗄️ Prisma Models - Card': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        term: { type: 'string', example: 'beautiful' },
        slug: { type: 'string', example: 'beautiful' },
        translate: { type: 'string', example: 'красивый' },
        definition: { type: 'string', example: 'Pleasing to the senses' },
        partOfSpeech: { $ref: '#/components/schemas/🔢 Enums - PartOfSpeech' },
        transcription: { type: 'string', example: 'ˈbjuːtɪfəl' },
        imageUrl: { type: 'string', example: 'https://example.com/image.jpg' },
        audioUrl: { type: 'string', example: 'https://example.com/audio.mp3' },
        isGlobal: { type: 'boolean', example: true },
        grammaticalGender: { type: 'string', example: 'MASCULINE' },
        difficulty: { $ref: '#/components/schemas/🔢 Enums - CardDifficulty' },
        contentType: { $ref: '#/components/schemas/🔢 Enums - ContentType' },
        contentStatus: {
          $ref: '#/components/schemas/🔢 Enums - ContentStatus',
        },
        userId: { type: 'string', example: 'cmfier0t20000p4hnsruuys02' },
        languageId: { type: 'string', example: 'cmfier0t20000p4hnsruuys03' },
        level: { $ref: '#/components/schemas/🔢 Enums - LanguageLevel' },
        ruleId: { type: 'string', example: 'cmfier0t20000p4hnsruuys04' },
        verbType: { $ref: '#/components/schemas/🔢 Enums - VerbType' },
        irregularVerbId: {
          type: 'string',
          example: 'cmfier0t20000p4hnsruuys05',
        },
        sourceProvider: { type: 'string', example: 'dictionary-api' },
        sourceId: { type: 'string', example: 'dict-12345' },
        studyCount: { type: 'number', example: 15 },
        viewCount: { type: 'number', example: 42 },
        lastUsedAt: { type: 'string', format: 'date-time' },
        // Связи
        user: { $ref: '#/components/schemas/🗄️ Prisma Models - User' },
        language: { $ref: '#/components/schemas/🗄️ Prisma Models - Language' },
        rule: { $ref: '#/components/schemas/🗄️ Prisma Models - GrammarRule' },
        irregularVerb: {
          $ref: '#/components/schemas/🗄️ Prisma Models - IrregularVerb',
        },
        definitions: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Definition' },
        },
        examples: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Example' },
        },
        userCards: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - UserCard' },
        },
        sets: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Set' },
        },
      },
    },
    '🗄️ Prisma Models - Set': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        name: { type: 'string', example: 'Базовые английские слова' },
        slug: { type: 'string', example: 'basic-english-words' },
        description: {
          type: 'string',
          example: 'Набор базовых английских слов',
        },
        isBase: { type: 'boolean', example: false },
        isPublic: { type: 'boolean', example: true },
        userId: { type: 'string', example: 'cmfier0t20000p4hnsruuys02' },
        languageId: { type: 'string', example: 'cmfier0t20000p4hnsruuys03' },
        level: { $ref: '#/components/schemas/🔢 Enums - LanguageLevel' },
        contentStatus: {
          $ref: '#/components/schemas/🔢 Enums - ContentStatus',
        },
        originalSetId: { type: 'string', example: 'cmfier0t20000p4hnsruuys04' },
        // Связи
        user: { $ref: '#/components/schemas/🗄️ Prisma Models - User' },
        language: { $ref: '#/components/schemas/🗄️ Prisma Models - Language' },
        cards: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Card' },
        },
        folders: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Folder' },
        },
        tags: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Tag' },
        },
        userSets: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - UserSet' },
        },
        originalSet: { $ref: '#/components/schemas/🗄️ Prisma Models - Set' },
        forkedSets: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Set' },
        },
      },
    },
    '🗄️ Prisma Models - Language': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        createdAt: { type: 'string', format: 'date-time' },
        name: { type: 'string', example: 'English' },
        code: { type: 'string', example: 'en' },
        isEnabled: { type: 'boolean', example: true },
        // Связи
        cards: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Card' },
        },
        sets: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Set' },
        },
      },
    },
  };

  // Добавляем дополнительные Prisma модели с префиксами
  const additionalModels = {
    '🗄️ Prisma Models - UserCard': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        userId: { type: 'string', example: 'cmfier0t20000p4hnsruuys02' },
        cardId: { type: 'string', example: 'cmfier0t20000p4hnsruuys03' },
        createdAt: { type: 'string', format: 'date-time' },
        // Связи
        user: { $ref: '#/components/schemas/🗄️ Prisma Models - User' },
        card: { $ref: '#/components/schemas/🗄️ Prisma Models - Card' },
      },
    },
    '🗄️ Prisma Models - UserSet': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        userId: { type: 'string', example: 'cmfier0t20000p4hnsruuys02' },
        setId: { type: 'string', example: 'cmfier0t20000p4hnsruuys03' },
        createdAt: { type: 'string', format: 'date-time' },
        // Связи
        user: { $ref: '#/components/schemas/🗄️ Prisma Models - User' },
        set: { $ref: '#/components/schemas/🗄️ Prisma Models - Set' },
      },
    },
    '🗄️ Prisma Models - Definition': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        cardId: { type: 'string', example: 'cmfier0t20000p4hnsruuys02' },
        text: { type: 'string', example: 'A definition text' },
        language: { type: 'string', example: 'en' },
        createdAt: { type: 'string', format: 'date-time' },
        // Связи
        card: { $ref: '#/components/schemas/🗄️ Prisma Models - Card' },
      },
    },
    '🗄️ Prisma Models - Example': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        cardId: { type: 'string', example: 'cmfier0t20000p4hnsruuys02' },
        text: { type: 'string', example: 'This is an example sentence' },
        translation: { type: 'string', example: 'Это пример предложения' },
        createdAt: { type: 'string', format: 'date-time' },
        // Связи
        card: { $ref: '#/components/schemas/🗄️ Prisma Models - Card' },
      },
    },
    '🗄️ Prisma Models - Folder': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        name: { type: 'string', example: 'My Study Folder' },
        description: { type: 'string', example: 'Folder for studying' },
        userId: { type: 'string', example: 'cmfier0t20000p4hnsruuys02' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        // Связи
        user: { $ref: '#/components/schemas/🗄️ Prisma Models - User' },
        sets: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Set' },
        },
      },
    },
    '🗄️ Prisma Models - Tag': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        name: { type: 'string', example: 'beginner' },
        color: { type: 'string', example: '#FF5733' },
        createdAt: { type: 'string', format: 'date-time' },
        // Связи
        sets: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Set' },
        },
      },
    },
    '🗄️ Prisma Models - GrammarRule': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        title: { type: 'string', example: 'Present Simple' },
        description: { type: 'string', example: 'Rule description' },
        languageId: { type: 'string', example: 'cmfier0t20000p4hnsruuys02' },
        createdAt: { type: 'string', format: 'date-time' },
        // Связи
        language: { $ref: '#/components/schemas/🗄️ Prisma Models - Language' },
        cards: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Card' },
        },
      },
    },
    '🗄️ Prisma Models - IrregularVerb': {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'cmfier0t20000p4hnsruuys01' },
        infinitive: { type: 'string', example: 'go' },
        pastSimple: { type: 'string', example: 'went' },
        pastParticiple: { type: 'string', example: 'gone' },
        languageId: { type: 'string', example: 'cmfier0t20000p4hnsruuys02' },
        createdAt: { type: 'string', format: 'date-time' },
        // Связи
        language: { $ref: '#/components/schemas/🗄️ Prisma Models - Language' },
        cards: {
          type: 'array',
          items: { $ref: '#/components/schemas/🗄️ Prisma Models - Card' },
        },
      },
    },
  };

  // Prisma модели уже имеют префиксы для группировки

  // Добавляем все Prisma модели в схемы
  Object.assign(document.components.schemas, prismaModels);
  Object.assign(document.components.schemas, additionalModels);

  // Добавляем все Prisma enum'ы с префиксами для группировки
  document.components.schemas['🔢 Enums - LanguageLevel'] = {
    type: 'string',
    enum: Object.values(LanguageLevel),
    description: 'Уровень сложности языка (A1, A2, B1, B2, C1, C2)',
    example: LanguageLevel.A1,
  };

  document.components.schemas['🔢 Enums - ContentStatus'] = {
    type: 'string',
    enum: Object.values(ContentStatus),
    description: 'Статус контента в системе',
    example: ContentStatus.PUBLISHED,
  };

  document.components.schemas['🔢 Enums - ContentType'] = {
    type: 'string',
    enum: Object.values(ContentType),
    description: 'Тип контента',
    example: ContentType.LANGUAGE,
  };

  document.components.schemas['🔢 Enums - CardDifficulty'] = {
    type: 'string',
    enum: Object.values(CardDifficulty),
    description: 'Сложность карточки',
    example: CardDifficulty.EASY,
  };

  document.components.schemas['🔢 Enums - PartOfSpeech'] = {
    type: 'string',
    enum: Object.values(PartOfSpeech),
    description: 'Часть речи',
    example: PartOfSpeech.NOUN,
  };

  document.components.schemas['🔢 Enums - VerbType'] = {
    type: 'string',
    enum: Object.values(VerbType),
    description: 'Тип глагола',
    example: VerbType.REGULAR,
  };

  document.components.schemas['🔢 Enums - UserRole'] = {
    type: 'string',
    enum: Object.values(UserRole),
    description: 'Роль пользователя в системе',
    example: UserRole.USER,
  };

  document.components.schemas['🔢 Enums - ContentAccess'] = {
    type: 'string',
    enum: Object.values(ContentAccess),
    description: 'Уровень доступа к контенту',
    example: ContentAccess.PUBLIC,
  };

  document.components.schemas['🔢 Enums - MediaType'] = {
    type: 'string',
    enum: Object.values(MediaType),
    description: 'Тип медиа файла',
    example: MediaType.IMAGE_JPG,
  };

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: '/api-docs/swagger.json',
    yamlDocumentUrl: '/api-docs/swagger.yaml',
  });
}
