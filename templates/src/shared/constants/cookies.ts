/**
 * Имена cookies, используемые во всем приложении
 * Все cookies имеют префикс 's4q_' для избежания конфликтов
 */
export const cookieNames = {
  /** Cookie для refresh токена аутентификации */
  refreshToken: 's4q_refresh_token',
  /** Cookie для access токена (если понадобится в будущем) */
  accessToken: 's4q_access_token',
} as const;

/**
 * Тип для имен cookies
 */
export type CookieName = (typeof cookieNames)[keyof typeof cookieNames];
