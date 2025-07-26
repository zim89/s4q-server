export const ErrorMsgs = {
  user: {
    alreadyExists: (email: string) => `User with email ${email} already exists`,
    notFound: 'User not found',
    invalidCredentials: 'Invalid email or password',
  },
  auth: {
    refreshTokenMissing: 'Refresh token is missing or invalid',
    refreshTokenInvalid: 'Refresh token is invalid or expired',
  },
  // можно добавить ещё общие ошибки
  common: {
    badRequestBody: 'Request body is required',
    unauthorized: 'You are not authorized to perform this action',
  },
} as const
