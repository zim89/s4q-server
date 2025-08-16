import { Version } from '@nestjs/common';
import { apiVersionDecorators, ModuleName } from '../constants';

/**
 * Декораторы для автоматического версионирования API
 *
 * Эти декораторы позволяют легко управлять версиями API эндпоинтов
 * без необходимости указывать версии вручную в каждом контроллере.
 */

/**
 * Декоратор для текущей версии модуля
 * Использует версию, определенную в moduleVersions
 *
 * @example
 * @apiVersionCurrent('auth')
 * @Post('login')
 * async login() { ... }
 */
export const apiVersionCurrent = (module: ModuleName) =>
  Version(apiVersionDecorators.current(module));

/**
 * Декоратор для стабильной версии модуля
 * Всегда использует стабильную версию API
 *
 * @example
 * @apiVersionStable('auth')
 * @Post('register')
 * async register() { ... }
 */
export const apiVersionStable = (module: ModuleName) =>
  Version(apiVersionDecorators.stable(module));

/**
 * Декоратор для экспериментальной версии
 * Используется для новых функций в разработке
 *
 * @example
 * @apiVersionExperimental()
 * @Post('new-feature')
 * async newFeature() { ... }
 */
export const apiVersionExperimental = () =>
  Version(apiVersionDecorators.experimental());

/**
 * Декоратор для бета версии
 * Используется для функций в активной разработке
 *
 * @example
 * @apiVersionBeta()
 * @Post('beta-feature')
 * async betaFeature() { ... }
 */
export const apiVersionBeta = () => Version(apiVersionDecorators.beta());

/**
 * Декоратор для множественных версий
 * Позволяет поддерживать несколько версий одного эндпоинта
 *
 * @example
 * @ApiVersionMultiple(['1', '2'])
 * @Post('feature')
 * async feature() { ... }
 */
export const ApiVersionMultiple = (versions: string[]) => {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // Применяем декоратор Version для каждой версии
    versions.forEach(version => {
      Version(version)(target, propertyKey, descriptor);
    });
  };
};

/**
 * Декоратор для устаревших версий
 * Помечает эндпоинт как устаревший
 *
 * @example
 * @ApiVersionDeprecated('1')
 * @Post('old-feature')
 * async oldFeature() { ... }
 */
export const ApiVersionDeprecated = (version: string) => {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // Применяем версию
    Version(version)(target, propertyKey, descriptor);

    // Добавляем метаданные о том, что эндпоинт устарел
    Reflect.defineMetadata('deprecated', true, descriptor.value as object);
    Reflect.defineMetadata(
      'deprecatedVersion',
      version,
      descriptor.value as object
    );
  };
};
