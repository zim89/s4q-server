/**
 * Константы для сортировки наборов
 *
 * Поля, по которым можно сортировать наборы.
 */
export const setSortFields = {
  createdAt: 'createdAt',
  name: 'name',
  type: 'type',
  level: 'level',
} as const;

export type SetSortField = (typeof setSortFields)[keyof typeof setSortFields];

export const setSortFieldValues: SetSortField[] = Object.values(setSortFields);
