import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvKeys, EnvSchema } from 'src/config';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Сервис для заполнения базы данных начальными данными
 *
 * Обрабатывает заполнение БД начальными данными и тестовыми данными.
 * Предоставляет методы для инициализации приложения.
 *
 * @description
 * Этот сервис отвечает за заполнение БД необходимыми данными при первом запуске.
 * Включает базовые языки, грамматические правила, формы глаголов,
 * теги и базовые наборы карточек.
 *
 * @example
 * // Использование в сервисе
 * constructor(private seed: SeedService) {}
 *
 * @example
 * // Заполнение начальными данными
 * await this.seed.seedInitialData();
 *
 * @example
 * // Заполнение только тестовыми данными
 * await this.seed.seedTestData();
 *
 * @example
 * // Очистка всех данных (только для разработки)
 * await this.seed.clearAllData();
 */
@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService<EnvSchema>
  ) {}

  /**
   * Seed initial data
   */
  async seedInitialData(): Promise<void> {
    const nodeEnv = this.configService.get(EnvKeys.NODE_ENV) as string;

    try {
      // Seed languages
      await this.seedLanguages();

      // Seed grammar rules
      await this.seedGrammarRules();

      // Seed verb forms
      await this.seedVerbForms();

      // Seed tags
      await this.seedTags();

      // Seed base sets
      await this.seedBaseSets();

      if (nodeEnv === 'development') {
        // Seed test data for development
        await this.seedTestData();
      }

      this.logger.log('Initial data seeded successfully');
    } catch (error) {
      this.logger.error('Failed to seed initial data', error);
      throw error;
    }
  }

  /**
   * Seed languages
   */
  private async seedLanguages(): Promise<void> {
    const languages = [
      { name: 'English', code: 'en', isEnabled: true },
      { name: 'German', code: 'de', isEnabled: true },
    ];

    for (const language of languages) {
      await this.prisma.language.upsert({
        where: { code: language.code },
        update: language,
        create: language,
      });
    }
  }

  /**
   * Seed grammar rules
   */
  private async seedGrammarRules(): Promise<void> {
    const rules = [
      {
        name: 'Present Simple',
        slug: 'present-simple',
        description: 'Used for habits, general truths, and scheduled events',
      },
      {
        name: 'Present Continuous',
        slug: 'present-continuous',
        description: 'Used for actions happening now or around now',
      },
      {
        name: 'Past Simple',
        slug: 'past-simple',
        description: 'Used for completed actions in the past',
      },
      {
        name: 'Future Simple',
        slug: 'future-simple',
        description: 'Used for predictions and spontaneous decisions',
      },
    ];

    for (const rule of rules) {
      await this.prisma.grammarRule.upsert({
        where: { slug: rule.slug },
        update: rule,
        create: rule,
      });
    }
  }

  /**
   * Seed verb forms
   */
  private async seedVerbForms(): Promise<void> {
    const verbForms = [
      {
        infinitive: 'be',
        pastSimple: 'was/were',
        pastParticiple: 'been',
        translation: 'быть',
        level: 'A1' as const,
      },
      {
        infinitive: 'have',
        pastSimple: 'had',
        pastParticiple: 'had',
        translation: 'иметь',
        level: 'A1' as const,
      },
      {
        infinitive: 'do',
        pastSimple: 'did',
        pastParticiple: 'done',
        translation: 'делать',
        level: 'A1' as const,
      },
      {
        infinitive: 'go',
        pastSimple: 'went',
        pastParticiple: 'gone',
        translation: 'идти',
        level: 'A1' as const,
      },
    ];

    for (const verbForm of verbForms) {
      const existing = await this.prisma.verbForm.findFirst({
        where: {
          infinitive: verbForm.infinitive,
          pastSimple: verbForm.pastSimple,
        },
      });

      if (!existing) {
        await this.prisma.verbForm.create({
          data: verbForm,
        });
      }
    }
  }

  /**
   * Seed tags
   */
  private async seedTags(): Promise<void> {
    const tags = [
      { name: 'Beginner', slug: 'beginner' },
      { name: 'Intermediate', slug: 'intermediate' },
      { name: 'Advanced', slug: 'advanced' },
      { name: 'Business', slug: 'business' },
      { name: 'Travel', slug: 'travel' },
      { name: 'Academic', slug: 'academic' },
      { name: 'Conversation', slug: 'conversation' },
      { name: 'Grammar', slug: 'grammar' },
      { name: 'Vocabulary', slug: 'vocabulary' },
    ];

    for (const tag of tags) {
      await this.prisma.tag.upsert({
        where: { slug: tag.slug },
        update: tag,
        create: tag,
      });
    }
  }

  /**
   * Seed base sets
   */
  private async seedBaseSets(): Promise<void> {
    const englishLanguage = await this.prisma.language.findUnique({
      where: { code: 'en' },
    });

    if (!englishLanguage) {
      this.logger.warn('English language not found, skipping base sets');
      return;
    }

    const baseSets = [
      {
        name: 'Essential English Words',
        slug: 'essential-english-words',
        description: 'Most common English words for beginners',
        type: 'LANGUAGE' as const,
        isBase: true,
        isPublic: true,
        languageId: englishLanguage.id,
        level: 'A1' as const,
      },
      {
        name: 'Business English',
        slug: 'business-english',
        description: 'Essential business vocabulary and phrases',
        type: 'LANGUAGE' as const,
        isBase: true,
        isPublic: true,
        languageId: englishLanguage.id,
        level: 'B1' as const,
      },
    ];

    for (const set of baseSets) {
      const existing = await this.prisma.set.findFirst({
        where: { slug: set.slug },
      });

      if (!existing) {
        await this.prisma.set.create({
          data: set,
        });
      }
    }
  }

  /**
   * Seed test data (development only)
   */
  private async seedTestData(): Promise<void> {
    // Create test user
    await this.prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        passwordHash: 'hashed_password',
        firstName: 'Test',
        lastName: 'User',
        rights: ['USER'],
      },
    });

    // Create test cards
    const testCards = [
      {
        content: 'hello',
        slug: 'hello',
        transcription: 'həˈloʊ',
        partOfSpeech: 'INTERJECTION' as const,
        isGlobal: true,
        languageId: (
          await this.prisma.language.findUnique({ where: { code: 'en' } })
        )?.id,
        level: 'A1' as const,
      },
      {
        content: 'world',
        slug: 'world',
        transcription: 'wɜːld',
        partOfSpeech: 'NOUN' as const,
        isGlobal: true,
        languageId: (
          await this.prisma.language.findUnique({ where: { code: 'en' } })
        )?.id,
        level: 'A1' as const,
      },
    ];

    for (const card of testCards) {
      const existing = await this.prisma.card.findFirst({
        where: {
          slug: card.slug,
          languageId: card.languageId || null,
        },
      });

      if (!existing) {
        await this.prisma.card.create({
          data: {
            wordOrPhrase: card.content,
            slug: card.slug,
            transcription: card.transcription,
            partOfSpeech: card.partOfSpeech,
            isGlobal: card.isGlobal,
            languageId: card.languageId || null,
            level: card.level,
          },
        });
      }
    }

    this.logger.log('Test data seeded successfully');
  }

  /**
   * Clear all data (development only)
   */
  async clearAllData(): Promise<void> {
    const nodeEnv = this.configService.get(EnvKeys.NODE_ENV) as string;
    if (nodeEnv === 'production') {
      throw new Error('Cannot clear data in production');
    }

    try {
      await this.prisma.$transaction([
        this.prisma.auditLog.deleteMany(),
        this.prisma.progress.deleteMany(),
        this.prisma.userCard.deleteMany(),
        this.prisma.userSet.deleteMany(),
        this.prisma.achievement.deleteMany(),
        this.prisma.session.deleteMany(),
        this.prisma.card.deleteMany(),
        this.prisma.set.deleteMany(),
        this.prisma.folder.deleteMany(),
        this.prisma.user.deleteMany(),
        this.prisma.definition.deleteMany(),
        this.prisma.example.deleteMany(),
        this.prisma.verbForm.deleteMany(),
        this.prisma.grammarRule.deleteMany(),
        this.prisma.tag.deleteMany(),
        this.prisma.language.deleteMany(),
      ]);

      this.logger.log('✅ All data cleared successfully');
    } catch (error) {
      this.logger.error('❌ Failed to clear data', error);
      throw error;
    }
  }
}
