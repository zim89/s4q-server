import { Injectable } from '@nestjs/common';
import { CardDifficulty, PartOfSpeech } from '@prisma/client';

/**
 * Сервис для автоматического расчета сложности карточек
 *
 * Анализирует различные характеристики слова/фразы для определения уровня сложности:
 * - Длина слова/фразы
 * - Наличие специальных символов
 * - Частота использования (базовые слова)
 * - Сложность произношения
 * - Часть речи
 * - Тип контента (фразовые глаголы, идиомы, предложения)
 */
@Injectable()
export class DifficultyCalculatorService {
  /**
   * Рассчитывает сложность карточки на основе слова или фразы
   *
   * @param term - слово или фраза для анализа
   * @param partOfSpeech - часть речи (опционально)
   * @returns уровень сложности карточки
   */
  calculateDifficulty(
    term: string,
    partOfSpeech?: PartOfSpeech
  ): CardDifficulty {
    const normalizedWord = term.toLowerCase().trim();

    // 1. Проверяем базовые слова (самые простые)
    if (this.isBasicWord(normalizedWord)) {
      return CardDifficulty.EASY;
    }

    // 2. Анализируем по части речи
    if (partOfSpeech) {
      const speechDifficulty = this.getDifficultyByPartOfSpeech(partOfSpeech);
      if (speechDifficulty) {
        return speechDifficulty;
      }
    }

    // 3. Проверяем специальные типы контента
    if (this.isPhrasalVerb(normalizedWord)) {
      return CardDifficulty.MEDIUM;
    }

    if (this.isIdiom(normalizedWord)) {
      return CardDifficulty.HARD;
    }

    if (this.isSentence(normalizedWord)) {
      return this.calculateSentenceDifficulty(normalizedWord);
    }

    if (this.isPhrase(normalizedWord)) {
      return this.calculatePhraseDifficulty(normalizedWord);
    }

    // 4. Анализируем отдельные слова
    return this.calculateWordDifficulty(normalizedWord);
  }

  /**
   * Рассчитывает сложность отдельного слова
   */
  private calculateWordDifficulty(word: string): CardDifficulty {
    // Очень короткие слова (1-2 символа)
    if (word.length <= 2) {
      return CardDifficulty.EASY;
    }

    // Короткие слова (3-4 символа)
    if (word.length <= 4) {
      return CardDifficulty.EASY;
    }

    // Средние слова (5-7 символов)
    if (word.length <= 7) {
      // Проверяем сложность произношения
      if (this.hasComplexPronunciation(word)) {
        return CardDifficulty.MEDIUM;
      }
      return CardDifficulty.EASY;
    }

    // Длинные слова (8-10 символов)
    if (word.length <= 10) {
      if (this.hasComplexPronunciation(word)) {
        return CardDifficulty.HARD;
      }
      return CardDifficulty.MEDIUM;
    }

    // Очень длинные слова (11+ символов)
    if (word.length > 10) {
      return CardDifficulty.HARD;
    }

    return CardDifficulty.MEDIUM;
  }

  /**
   * Рассчитывает сложность предложения
   */
  private calculateSentenceDifficulty(sentence: string): CardDifficulty {
    const wordCount = sentence.trim().split(/\s+/).length;

    if (wordCount <= 5) {
      return CardDifficulty.EASY;
    }

    if (wordCount <= 10) {
      return CardDifficulty.MEDIUM;
    }

    return CardDifficulty.HARD;
  }

  /**
   * Рассчитывает сложность фразы
   */
  private calculatePhraseDifficulty(phrase: string): CardDifficulty {
    const wordCount = phrase.trim().split(/\s+/).length;

    if (wordCount <= 3) {
      return CardDifficulty.EASY;
    }

    if (wordCount <= 6) {
      return CardDifficulty.MEDIUM;
    }

    return CardDifficulty.HARD;
  }

  /**
   * Определяет сложность по части речи
   */
  private getDifficultyByPartOfSpeech(
    partOfSpeech: PartOfSpeech
  ): CardDifficulty | null {
    const difficultyMap: Record<PartOfSpeech, CardDifficulty> = {
      // Простые части речи
      [PartOfSpeech.ARTICLE]: CardDifficulty.EASY,
      [PartOfSpeech.PRONOUN]: CardDifficulty.EASY,
      [PartOfSpeech.PREPOSITION]: CardDifficulty.EASY,
      [PartOfSpeech.CONJUNCTION]: CardDifficulty.EASY,
      [PartOfSpeech.INTERJECTION]: CardDifficulty.EASY,
      [PartOfSpeech.PARTICLE]: CardDifficulty.EASY,

      // Средние части речи
      [PartOfSpeech.NOUN]: CardDifficulty.MEDIUM,
      [PartOfSpeech.VERB]: CardDifficulty.MEDIUM,
      [PartOfSpeech.ADJECTIVE]: CardDifficulty.MEDIUM,
      [PartOfSpeech.ADVERB]: CardDifficulty.MEDIUM,

      // Сложные типы контента
      [PartOfSpeech.PHRASE]: CardDifficulty.MEDIUM,
      [PartOfSpeech.PHRASE_VERB]: CardDifficulty.MEDIUM,
      [PartOfSpeech.IDIOM]: CardDifficulty.HARD,
      [PartOfSpeech.SENTENCE]: CardDifficulty.HARD,
    };

    return difficultyMap[partOfSpeech] || null;
  }

  /**
   * Проверяет, является ли слово базовым (часто используемым)
   */
  private isBasicWord(word: string): boolean {
    const basicWords = [
      // Артикли и местоимения
      'a',
      'an',
      'the',
      'this',
      'that',
      'these',
      'those',
      'i',
      'you',
      'he',
      'she',
      'it',
      'we',
      'they',
      'me',
      'him',
      'her',
      'us',
      'them',
      'my',
      'your',
      'his',
      'her',
      'its',
      'our',
      'their',
      'mine',
      'yours',
      'his',
      'hers',
      'ours',
      'theirs',

      // Предлоги и союзы
      'in',
      'on',
      'at',
      'to',
      'for',
      'of',
      'with',
      'by',
      'from',
      'up',
      'down',
      'out',
      'off',
      'over',
      'under',
      'and',
      'or',
      'but',
      'so',
      'because',
      'if',
      'when',
      'where',

      // Глаголы-связки
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

      // Базовые глаголы
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
      'put',
      'turn',
      'move',
      'run',
      'walk',
      'sit',
      'stand',
      'eat',
      'drink',
      'sleep',
      'play',

      // Базовые прилагательные
      'good',
      'bad',
      'big',
      'small',
      'new',
      'old',
      'young',
      'long',
      'short',
      'high',
      'low',
      'hot',
      'cold',
      'warm',
      'cool',
      'fast',
      'slow',
      'easy',
      'hard',
      'right',
      'wrong',
      'same',
      'different',
      'first',
      'last',
      'next',
      'early',
      'late',
      'important',
      'nice',

      // Базовые наречия
      'very',
      'really',
      'quite',
      'rather',
      'too',
      'so',
      'more',
      'most',
      'now',
      'then',
      'here',
      'there',
      'today',
      'yesterday',
      'tomorrow',
      'always',
      'never',
      'sometimes',
      'often',
      'usually',
      'well',
      'better',

      // Базовые существительные
      'time',
      'day',
      'night',
      'year',
      'month',
      'week',
      'hour',
      'minute',
      'man',
      'woman',
      'boy',
      'girl',
      'child',
      'person',
      'people',
      'house',
      'home',
      'room',
      'door',
      'window',
      'table',
      'chair',
      'car',
      'bus',
      'train',
      'plane',
      'boat',
      'bike',
      'walk',
      'food',
      'water',
      'milk',
      'bread',
      'meat',
      'fish',
      'fruit',
      'book',
      'paper',
      'pen',
      'pencil',
      'phone',
      'computer',
      'tv',
      'money',
      'work',
      'job',
      'school',
      'teacher',
      'student',
      'friend',
      'family',
      'mother',
      'father',
      'sister',
      'brother',
      'son',
      'daughter',
    ];

    return basicWords.includes(word);
  }

  /**
   * Проверяет, является ли контент фразовым глаголом
   */
  private isPhrasalVerb(content: string): boolean {
    const normalized = content.toLowerCase().trim();

    if (!normalized.includes(' ')) {
      return false;
    }

    // Паттерны фразовых глаголов
    const phrasalVerbPatterns = [
      /\b(look|get|give|take|put|come|go|make|turn|bring|call|cut|do|fall|find|hold|keep|let|move|pass|pick|pull|push|run|send|set|show|shut|sit|stand|start|stop|talk|think|throw|try|walk|work)\s+(up|down|in|out|on|off|away|back|over|through|around|about|after|against|along|among|at|before|behind|below|beneath|beside|between|beyond|by|during|except|for|from|inside|into|like|near|of|onto|outside|over|past|since|throughout|to|toward|under|underneath|until|upon|with|within|without)\b/i,
    ];

    return phrasalVerbPatterns.some(pattern => pattern.test(normalized));
  }

  /**
   * Проверяет, является ли контент идиомой
   */
  private isIdiom(content: string): boolean {
    const normalized = content.toLowerCase().trim();

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
      'bite the bullet',
      'call it a day',
      'get something out of your system',
      'make a long story short',
      'on the same page',
      'pull yourself together',
      'so far so good',
      'speak of the devil',
      'that is the last straw',
      'time flies',
      'you can say that again',
      'your guess is as good as mine',
    ];

    return commonIdioms.includes(normalized);
  }

  /**
   * Проверяет, является ли контент предложением
   */
  private isSentence(content: string): boolean {
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
  private isPhrase(content: string): boolean {
    const normalized = content.trim();

    // Фразы содержат пробелы
    if (!normalized.includes(' ')) {
      return false;
    }

    // Фразы не заканчиваются знаками препинания
    if (/[.!?]$/.test(normalized)) {
      return false;
    }

    // Фразы не начинаются с заглавной буквы
    if (/^[A-Z]/.test(normalized)) {
      return false;
    }

    return true;
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
      /(ough|eigh|augh|tion|sion|cious|tious|cious|tial|cial|sure|ture|sion|tion|ment|ness|ful|less|able|ible|ous|ious|eous|uous|al|ial|ical|ical|ic|tic|ary|ery|ory|ize|ise|ify|fy|en|ed|ing|er|est|ly|ward|wards|wise|like|ish|y|ed|ing|er|est|ly|ward|wards|wise|like|ish|y)$/i;
    if (complexEndings.test(word)) {
      return true;
    }

    // Слова с необычными буквами
    const unusualLetters = /[qjxz]/i;
    if (unusualLetters.test(word)) {
      return true;
    }

    return false;
  }
}
