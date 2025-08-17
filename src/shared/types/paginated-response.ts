/**
 * Интерфейс для пагинированных ответов API
 *
 * Универсальный интерфейс для возврата коллекций с метаданными пагинации.
 * Используется во всех модулях для единообразного API.
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
