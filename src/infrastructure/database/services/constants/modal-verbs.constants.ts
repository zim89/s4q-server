import { LanguageLevel, VerbType } from '@prisma/client';

/**
 * Тип для данных модальных глаголов
 */
export interface ModalVerbData {
  infinitive: string;
  pastSimple: string;
  pastParticiple: string;
  translation: string;
  level: LanguageLevel;
  verbType: VerbType;
  frequency: number;
  difficulty: number;
  transcription?: string;
  languageCode: string;
}

/**
 * Данные модальных глаголов английского языка
 */
export const modalVerbsData: ModalVerbData[] = [
  // A1 Level - Basic Modal Verbs
  {
    infinitive: 'can',
    pastSimple: 'could',
    pastParticiple: 'been able to',
    translation: 'мочь, уметь',
    level: 'A1',
    verbType: 'MODAL',
    frequency: 10,
    difficulty: 4,
    languageCode: 'en',
    transcription: 'kæn',
  },
  {
    infinitive: 'may',
    pastSimple: 'might',
    pastParticiple: 'been allowed to',
    translation: 'можно, разрешено',
    level: 'A1',
    verbType: 'MODAL',
    frequency: 8,
    difficulty: 5,
    languageCode: 'en',
    transcription: 'meɪ',
  },
  {
    infinitive: 'must',
    pastSimple: 'had to',
    pastParticiple: 'had to',
    translation: 'должен, необходимо',
    level: 'A1',
    verbType: 'MODAL',
    frequency: 9,
    difficulty: 5,
    languageCode: 'en',
    transcription: 'mʌst',
  },
  {
    infinitive: 'will',
    pastSimple: 'would',
    pastParticiple: 'would',
    translation: 'буду, воля',
    level: 'A1',
    verbType: 'MODAL',
    frequency: 10,
    difficulty: 4,
    languageCode: 'en',
    transcription: 'wɪl',
  },
  {
    infinitive: 'shall',
    pastSimple: 'should',
    pastParticiple: 'should',
    translation: 'должен, следует',
    level: 'A1',
    verbType: 'MODAL',
    frequency: 7,
    difficulty: 6,
    languageCode: 'en',
    transcription: 'ʃæl',
  },

  // A2 Level - More Complex Modal Verbs
  {
    infinitive: 'could',
    pastSimple: 'could',
    pastParticiple: 'been able to',
    translation: 'мог бы, умел бы',
    level: 'A2',
    verbType: 'MODAL',
    frequency: 9,
    difficulty: 6,
    languageCode: 'en',
    transcription: 'kʊd',
  },
  {
    infinitive: 'might',
    pastSimple: 'might',
    pastParticiple: 'might',
    translation: 'возможно, может быть',
    level: 'A2',
    verbType: 'MODAL',
    frequency: 7,
    difficulty: 6,
    languageCode: 'en',
    transcription: 'maɪt',
  },
  {
    infinitive: 'should',
    pastSimple: 'should',
    pastParticiple: 'should',
    translation: 'следует, должен',
    level: 'A2',
    verbType: 'MODAL',
    frequency: 8,
    difficulty: 6,
    languageCode: 'en',
    transcription: 'ʃʊd',
  },
  {
    infinitive: 'would',
    pastSimple: 'would',
    pastParticiple: 'would',
    translation: 'бы, хотел бы',
    level: 'A2',
    verbType: 'MODAL',
    frequency: 9,
    difficulty: 6,
    languageCode: 'en',
    transcription: 'wʊd',
  },
  {
    infinitive: 'need',
    pastSimple: 'needed',
    pastParticiple: 'needed',
    translation: 'нуждаться, необходимо',
    level: 'A2',
    verbType: 'MODAL',
    frequency: 8,
    difficulty: 5,
    languageCode: 'en',
    transcription: 'niːd',
  },
];
