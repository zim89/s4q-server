import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prisma сервис для работы с базой данных
 *
 * Расширяет PrismaClient с автоматическим управлением соединениями.
 * Обрабатывает жизненный цикл подключения к базе данных (подключение/отключение).
 * Предоставляет типобезопасный доступ к базе данных во всем приложении.
 *
 * @description
 * Этот сервис является основным интерфейсом для работы с базой данных.
 * Он автоматически подключается при инициализации модуля и отключается при его уничтожении.
 * Все CRUD операции выполняются через этот сервис.
 *
 * @example
 * // Использование в сервисе
 * constructor(private prisma: PrismaService) {}
 *
 * @example
 * // Операции с базой данных
 * // Получить всех пользователей
 * const users = await this.prisma.user.findMany();
 *
 * // Создать нового пользователя
 * const user = await this.prisma.user.create({
 *   data: {
 *     email: 'user@example.com',
 *     passwordHash: 'hashedPassword'
 *   }
 * });
 *
 * // Найти пользователя по ID
 * const user = await this.prisma.user.findUnique({
 *   where: { id: 'user-id' }
 * });
 *
 * // Обновить пользователя
 * const updatedUser = await this.prisma.user.update({
 *   where: { id: 'user-id' },
 *   data: { firstName: 'John' }
 * });
 *
 * // Удалить пользователя
 * await this.prisma.user.delete({
 *   where: { id: 'user-id' }
 * });
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Подключается к базе данных при инициализации модуля
   *
   * Вызывается автоматически NestJS хуками жизненного цикла.
   * Устанавливает соединение с базой данных при запуске приложения.
   *
   * @description
   * Этот метод гарантирует, что соединение с базой данных установлено
   * до того, как приложение начнет обрабатывать запросы.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Отключается от базы данных при уничтожении модуля
   *
   * Вызывается автоматически NestJS хуками жизненного цикла.
   * Корректно закрывает соединение с базой данных при завершении приложения.
   *
   * @description
   * Этот метод обеспечивает правильное освобождение ресурсов
   * и предотвращает утечки соединений.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
