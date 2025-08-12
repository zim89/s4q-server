/**
 * Validation message templates for form validation
 * Used with class-validator decorators
 */
export const validationMessages = {
  /** Field is required */
  required: (field: string) => `${field} is required`,

  /** Field must be a string */
  mustBeString: (field: string) => `${field} must be a string`,

  /** Field must be a number */
  mustBeNumber: (field: string) => `${field} must be a number`,

  /** Field must be a boolean */
  mustBeBoolean: (field: string) => `${field} must be a boolean`,

  /** Field must be a valid email */
  emailFormat: 'Email must be a valid email address',

  /** Field must be a valid URL */
  urlFormat: 'Must be a valid URL',

  /** Field minimum length validation */
  minLength: (field: string, len: number) =>
    `${field} must be at least ${len} characters long`,

  /** Field maximum length validation */
  maxLength: (field: string, len: number) =>
    `${field} must be less than ${len} characters`,

  /** Field minimum value validation */
  minValue: (field: string, value: number) =>
    `${field} must be at least ${value}`,

  /** Field maximum value validation */
  maxValue: (field: string, value: number) =>
    `${field} must be less than ${value}`,

  /** Field must be a positive number */
  positive: (field: string) => `${field} must be a positive number`,

  /** Field must be a valid date */
  validDate: (field: string) => `${field} must be a valid date`,

  /** Field must match pattern */
  pattern: (field: string, pattern: string) =>
    `${field} must match pattern: ${pattern}`,
} as const;
