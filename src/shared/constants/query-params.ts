/**
 * Ключи для query параметров
 *
 * Централизованные константы для всех query параметров API.
 * Используются для избежания опечаток и упрощения рефакторинга.
 */
export const queryParamsKeys = {
  // Пагинация
  page: 'page',
  limit: 'limit',

  // Фильтры карточек
  difficulty: 'difficulty',
  partOfSpeech: 'partOfSpeech',
  search: 'search',

  // Сортировка
  sort: 'sort',
  order: 'order',
} as const;
