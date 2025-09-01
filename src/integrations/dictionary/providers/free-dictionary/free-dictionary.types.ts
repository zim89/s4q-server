/**
 * Типы для Free Dictionary API
 *
 * Документация: https://dictionaryapi.dev/
 */

export interface FreeDictionaryPhonetic {
  text: string;
  audio?: string;
}

export interface FreeDictionaryDefinition {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

export interface FreeDictionaryMeaning {
  partOfSpeech: string;
  definitions: FreeDictionaryDefinition[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface FreeDictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics: FreeDictionaryPhonetic[];
  origin?: string;
  meanings: FreeDictionaryMeaning[];
}

export type FreeDictionaryResponse = FreeDictionaryEntry[];

export interface FreeDictionaryError {
  title: string;
  message: string;
  resolution: string;
}
