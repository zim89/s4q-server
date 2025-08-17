/**
 * Общие константы для сортировки
 *
 * Константы, которые используются во всех модулях.
 */
export const sortOrders = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type SortOrder = (typeof sortOrders)[keyof typeof sortOrders];

export const sortOrderValues: SortOrder[] = Object.values(sortOrders);
