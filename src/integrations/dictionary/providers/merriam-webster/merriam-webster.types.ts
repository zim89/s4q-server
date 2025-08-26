/**
 * Типы для Merriam-Webster API
 *
 * Документация: https://dictionaryapi.com/
 */

/**
 * Ответ от Merriam-Webster API
 */
export interface MerriamWebsterResponse {
  meta: MerriamWebsterMeta;
  hwi: MerriamWebsterHwi;
  fl: string;
  def: MerriamWebsterDefinition[];
  et?: string[][];
  date?: string;
  shortdef: string[];
}

/**
 * Метаданные слова
 */
export interface MerriamWebsterMeta {
  id: string;
  uuid: string;
  sort: string;
  src: string;
  section: string;
  stems: string[];
  offensive: boolean;
}

/**
 * Заголовок слова (headword information)
 */
export interface MerriamWebsterHwi {
  hw: string;
  prs?: MerriamWebsterPronunciation[];
}

/**
 * Произношение
 */
export interface MerriamWebsterPronunciation {
  mw: string;
  sound?: {
    audio: string;
    ref: string;
    stat: string;
  };
}

/**
 * Определение
 */
export interface MerriamWebsterDefinition {
  sseq: MerriamWebsterSense[][];
}

/**
 * Значение (sense)
 */
export interface MerriamWebsterSense {
  dt: [string, string | MerriamWebsterDefinedRunOn][];
  sdsense?: {
    sd: string;
    dt: [string, string][];
  };
}

/**
 * Определенное продолжение
 */
export interface MerriamWebsterDefinedRunOn {
  text: string;
  ref?: string;
  type?: string;
}

/**
 * Ошибка Merriam-Webster API
 */
export interface MerriamWebsterError {
  error: string;
  message: string;
  status: number;
}
