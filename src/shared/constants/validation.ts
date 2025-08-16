/**
 * Шаблоны сообщений валидации для форм
 * Используются с декораторами class-validator
 */
export const validationMessages = {
  /** Поле обязательно для заполнения */
  required: (field: string) => `${field} обязательно для заполнения`,

  /** Поле должно быть строкой */
  mustBeString: (field: string) => `${field} должно быть строкой`,

  /** Поле должно быть числом */
  mustBeNumber: (field: string) => `${field} должно быть числом`,

  /** Поле должно быть булевым значением */
  mustBeBoolean: (field: string) => `${field} должно быть булевым значением`,

  /** Поле должно быть валидным email */
  emailFormat: 'Email должен быть валидным адресом',

  /** Поле должно быть валидным URL */
  urlFormat: 'Должен быть валидным URL',

  /** Валидация минимальной длины поля */
  minLength: (field: string, len: number) =>
    `${field} должно содержать минимум ${len} символов`,

  /** Валидация максимальной длины поля */
  maxLength: (field: string, len: number) =>
    `${field} должно содержать максимум ${len} символов`,

  /** Валидация минимального значения поля */
  minValue: (field: string, value: number) =>
    `${field} должно быть не менее ${value}`,

  /** Валидация максимального значения поля */
  maxValue: (field: string, value: number) =>
    `${field} должно быть не более ${value}`,

  /** Поле должно быть положительным числом */
  positive: (field: string) => `${field} должно быть положительным числом`,

  /** Поле должно быть валидной датой */
  validDate: (field: string) => `${field} должно быть валидной датой`,

  /** Поле должно соответствовать паттерну */
  pattern: (field: string, pattern: string) =>
    `${field} должно соответствовать паттерну: ${pattern}`,
} as const;

/**
 * Тип для сообщений валидации
 */
export type ValidationMessage =
  (typeof validationMessages)[keyof typeof validationMessages];
