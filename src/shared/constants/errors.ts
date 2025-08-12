/**
 * Error messages used throughout the application
 * Organized by domain/module for better maintainability
 */
export const errorMessages = {
  /** User-related error messages */
  user: {
    /** User already exists with given email */
    alreadyExists: (email: string) => `User with email ${email} already exists`,
    /** User not found in database */
    notFound: 'User not found',
    /** Invalid credentials during login */
    invalidCredentials: 'Invalid email or password',
    /** User account is deactivated */
    accountDeactivated: 'Account is deactivated',
    /** User account is not verified */
    accountNotVerified: 'Email address is not verified',
  },

  /** Authentication-related error messages */
  auth: {
    /** Refresh token is missing from request */
    refreshTokenMissing: 'Refresh token is missing or invalid',
    /** Refresh token is invalid or expired */
    refreshTokenInvalid: 'Refresh token is invalid or expired',
    /** Access token is invalid or expired */
    accessTokenInvalid: 'Access token is invalid or expired',
    /** User is not authenticated */
    notAuthenticated: 'User not authenticated',
    /** User is not authorized for this action */
    notAuthorized: 'You are not authorized to perform this action',
  },

  /** Common error messages */
  common: {
    /** Request body is missing or invalid */
    badRequestBody: 'Request body is required',
    /** Generic unauthorized error */
    unauthorized: 'You are not authorized to perform this action',
    /** Generic forbidden error */
    forbidden: 'Access forbidden',
    /** Generic not found error */
    notFound: 'Resource not found',
    /** Generic validation error */
    validationError: 'Validation failed',
  },
} as const;
