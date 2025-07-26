export const ValidationMsgTemplates = {
  required: (field: string) => `${field} is required`,
  mustBeString: (field: string) => `${field} must be a string`,
  minLength: (field: string, len: number) => `${field} must be at least ${len} characters long`,
  maxLength: (field: string, len: number) => `${field} must be less than ${len} characters`,
  emailFormat: 'Email must be a valid email address',
} as const
