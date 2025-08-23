import { Injectable } from '@nestjs/common';
import { CardDifficulty } from '@prisma/client';

/**
 * Сервис для автоматического расчета сложности карточек
 *
 * Анализирует различные характеристики слова/фразы для определения уровня сложности:
 * - Длина слова/фразы
 * - Наличие специальных символов
 * - Частота использования (базовые слова)
 * - Сложность произношения
 */
@Injectable()
export class DifficultyCalculatorService {
  /**
   * Рассчитывает сложность карточки на основе слова или фразы
   *
   * @param wordOrPhrase - слово или фраза для анализа
   * @returns уровень сложности карточки
   */
  calculateDifficulty(wordOrPhrase: string): CardDifficulty {
    const normalizedWord = wordOrPhrase.toLowerCase().trim();

    // Базовые слова (самые простые)
    if (this.isBasicWord(normalizedWord)) {
      return CardDifficulty.EASY;
    }

    // Короткие слова (1-3 символа)
    if (normalizedWord.length <= 3) {
      return CardDifficulty.EASY;
    }

    // Средние слова (4-6 символов)
    if (normalizedWord.length <= 6) {
      return CardDifficulty.MEDIUM;
    }

    // Длинные слова (7+ символов)
    if (normalizedWord.length <= 10) {
      return CardDifficulty.MEDIUM;
    }

    // Очень длинные слова или фразы
    if (normalizedWord.length > 10) {
      return CardDifficulty.HARD;
    }

    // Слова с сложным произношением
    if (this.hasComplexPronunciation(normalizedWord)) {
      return CardDifficulty.HARD;
    }

    // По умолчанию средняя сложность
    return CardDifficulty.MEDIUM;
  }

  /**
   * Проверяет, является ли слово базовым (часто используемым)
   */
  private isBasicWord(word: string): boolean {
    const basicWords = [
      'a',
      'an',
      'the',
      'and',
      'or',
      'but',
      'in',
      'on',
      'at',
      'to',
      'for',
      'of',
      'with',
      'by',
      'is',
      'are',
      'was',
      'were',
      'be',
      'been',
      'being',
      'have',
      'has',
      'had',
      'do',
      'does',
      'did',
      'will',
      'would',
      'could',
      'should',
      'may',
      'might',
      'can',
      'go',
      'get',
      'make',
      'take',
      'see',
      'come',
      'know',
      'think',
      'look',
      'want',
      'give',
      'use',
      'find',
      'tell',
      'ask',
      'work',
      'seem',
      'feel',
      'try',
      'leave',
      'call',
      'good',
      'new',
      'first',
      'last',
      'long',
      'great',
      'little',
      'own',
      'other',
      'old',
      'right',
      'big',
      'high',
      'different',
      'small',
      'large',
      'next',
      'early',
      'young',
      'important',
      'few',
      'public',
      'bad',
      'same',
      'able',
      'beautiful',
      'nice',
      'pretty',
      'handsome',
      'lovely',
      'gorgeous',
      'stunning',
      'attractive',
      'cute',
      'charming',
      'elegant',
      'graceful',
      'splendid',
      'magnificent',
      'wonderful',
      'fantastic',
      'amazing',
      'excellent',
      'perfect',
      'brilliant',
      'outstanding',
      'superb',
      'terrific',
      'awesome',
      'fabulous',
      'marvelous',
      'splendid',
      'glorious',
      'divine',
      'heavenly',
    ];

    return basicWords.includes(word);
  }

  /**
   * Проверяет, имеет ли слово сложное произношение
   */
  private hasComplexPronunciation(word: string): boolean {
    // Слова с множественными согласными подряд
    const consonantClusters = /[bcdfghjklmnpqrstvwxz]{3,}/i;
    if (consonantClusters.test(word)) {
      return true;
    }

    // Слова с необычными комбинациями букв
    const unusualCombinations = /[aeiou]{3,}|[bcdfghjklmnpqrstvwxz]{4,}/i;
    if (unusualCombinations.test(word)) {
      return true;
    }

    // Слова с типично сложными окончаниями
    const complexEndings =
      /(ough|eigh|augh|tion|sion|cious|tious|cious|tial|cial)$/i;
    if (complexEndings.test(word)) {
      return true;
    }

    return false;
  }
}
