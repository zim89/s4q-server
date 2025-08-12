/**
 * Cookie names used throughout the application
 * All cookies are prefixed with 's4q_' to avoid conflicts
 */
export const cookieNames = {
  /** Refresh token cookie for authentication */
  refreshToken: 's4q_refresh_token',
  /** Access token cookie (if needed in future) */
  accessToken: 's4q_access_token',
} as const;

/**
 * Type for cookie names
 */
export type CookieName = (typeof cookieNames)[keyof typeof cookieNames];
