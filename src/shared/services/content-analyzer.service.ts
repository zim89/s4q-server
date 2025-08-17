import { Injectable } from '@nestjs/common';
import { ContentStatus, ContentType, PartOfSpeech } from '@prisma/client';

/**
 * Сервис для анализа типа контента и характеристик слова/фразы
 *
 * Определяет:
 * - Тип контента (TEXT, AUDIO, etc.)
 * - Статус контента
 * - Является ли контент отдельным словом или фразой
 * - Нужно ли получать данные из словаря
 */
@Injectable()
export class ContentAnalyzerService {
  /**
   * Определяет тип контента на основе входных данных
   */
  determineContentType(): ContentType {
    // Всегда текстовый контент для слов и фраз
    return ContentType.TEXT;
  }

  /**
   * Определяет статус контента
   */
  determineContentStatus(): ContentStatus {
    // По умолчанию создаем как черновик
    return ContentStatus.DRAFT;
  }

  /**
   * Проверяет, является ли контент отдельным словом
   */
  isSingleWord(content: string): boolean {
    const normalized = content.trim();

    // Проверяем, что это одно слово без пробелов
    if (normalized.includes(' ')) {
      return false;
    }

    // Проверяем, что это не пустая строка
    if (normalized.length === 0) {
      return false;
    }

    // Проверяем, что это не предложение (нет знаков препинания в конце)
    if (/[.!?]$/.test(normalized)) {
      return false;
    }

    return true;
  }

  /**
   * Проверяет, является ли контент фразовым глаголом
   */
  isPhrasalVerb(content: string): boolean {
    const normalized = content.toLowerCase().trim();

    // Фразовые глаголы содержат пробел и обычно состоят из глагола + предлога/наречия
    if (!normalized.includes(' ')) {
      return false;
    }

    // Проверяем паттерны фразовых глаголов
    const phrasalVerbPatterns = [
      /\b(look|get|give|take|put|come|go|make|turn|bring|call|come|cut|do|fall|find|hold|keep|let|move|pass|pick|pull|push|run|send|set|show|shut|sit|stand|start|stop|talk|think|throw|try|turn|walk|work)\s+(up|down|in|out|on|off|away|back|over|through|around|about|after|against|along|among|at|before|behind|below|beneath|beside|between|beyond|by|during|except|for|from|inside|into|like|near|of|off|on|onto|outside|over|past|since|through|throughout|to|toward|under|underneath|until|up|upon|with|within|without)\b/i,
    ];

    return phrasalVerbPatterns.some(pattern => pattern.test(normalized));
  }

  /**
   * Проверяет, является ли контент предложением
   */
  isSentence(content: string): boolean {
    const normalized = content.trim();

    // Предложения обычно заканчиваются знаками препинания
    if (!/[.!?]$/.test(normalized)) {
      return false;
    }

    // Предложения содержат пробелы
    if (!normalized.includes(' ')) {
      return false;
    }

    // Предложения обычно начинаются с заглавной буквы
    if (!/^[A-Z]/.test(normalized)) {
      return false;
    }

    return true;
  }

  /**
   * Проверяет, является ли контент фразой (не словом, не предложением)
   */
  isPhrase(content: string): boolean {
    const normalized = content.trim();

    // Фразы содержат пробелы, но не заканчиваются знаками препинания
    if (!normalized.includes(' ')) {
      return false;
    }

    if (/[.!?]$/.test(normalized)) {
      return false;
    }

    return true;
  }

  /**
   * Проверяет, является ли контент идиомой
   */
  isIdiom(content: string): boolean {
    const normalized = content.toLowerCase().trim();

    // Список известных идиом (можно расширить)
    const commonIdioms = [
      'break a leg',
      'piece of cake',
      'hit the nail on the head',
      'let the cat out of the bag',
      "pull someone's leg",
      'cost an arm and a leg',
      'get out of hand',
      'miss the boat',
      'break the ice',
      'cut corners',
      'get over something',
      'make ends meet',
      'on the ball',
      'pull yourself together',
      'so far so good',
      'speak of the devil',
      'the last straw',
      'time flies',
      'you can say that again',
      'your guess is as good as mine',
    ];

    return commonIdioms.includes(normalized);
  }

  /**
   * Определяет, нужно ли получать данные из словаря
   */
  shouldFetchFromDictionary(content: string, languageCode?: string): boolean {
    // Если язык не английский, не обращаемся к словарю
    if (languageCode && languageCode !== 'en') {
      return false;
    }

    // Если это не отдельное слово, не обращаемся к словарю
    if (!this.isSingleWord(content)) {
      return false;
    }

    // Проверяем, что это не специальные символы или числа
    if (/^[0-9\s\W]+$/.test(content)) {
      return false;
    }

    return true;
  }

  /**
   * Определяет часть речи на основе типа контента
   */
  determinePartOfSpeech(content: string): PartOfSpeech {
    if (this.isIdiom(content)) {
      return PartOfSpeech.IDIOM;
    }

    if (this.isPhrasalVerb(content)) {
      return PartOfSpeech.PHRASE_VERB;
    }

    if (this.isSentence(content)) {
      return PartOfSpeech.SENTENCE;
    }

    if (this.isPhrase(content)) {
      return PartOfSpeech.PHRASE;
    }

    // Для отдельных слов часть речи будет определена из словаря или DTO
    return PartOfSpeech.NOUN; // fallback
  }

  /**
   * Рассчитывает сложность для фраз на основе количества слов
   */
  calculatePhraseDifficulty(content: string): 'EASY' | 'MEDIUM' | 'HARD' {
    const wordCount = content.trim().split(/\s+/).length;

    if (wordCount <= 3) {
      return 'EASY';
    }

    if (wordCount <= 6) {
      return 'MEDIUM';
    }

    return 'HARD';
  }
}
