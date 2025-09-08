/**
 * Константы для сортировки карточек
 *
 * Поля, по которым можно сортировать карточки.
 */
export const cardSortFields = {
  createdAt: 'createdAt',
  term: 'term',
  difficulty: 'difficulty',
} as const;

export type CardSortField =
  (typeof cardSortFields)[keyof typeof cardSortFields];

export const cardSortFieldValues: CardSortField[] =
  Object.values(cardSortFields);
