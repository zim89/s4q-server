/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

/**
 * Email Service
 *
 * TODO: Реализовать интеграцию с email сервисом для:
 * - Отправки уведомлений пользователям
 * - Подтверждения email адресов
 * - Восстановления паролей
 * - Маркетинговых рассылок
 */
@Injectable()
export class EmailService {
  /**
   * TODO: Отправить email
   */
  async sendEmail(): Promise<void> {
    // TODO: Реализовать отправку email
    console.log('Email: sendEmail - not implemented');
  }

  /**
   * TODO: Отправить уведомление
   */
  async sendNotification(): Promise<void> {
    // TODO: Реализовать отправку уведомлений
    console.log('Email: sendNotification - not implemented');
  }

  /**
   * TODO: Отправить подтверждение email
   */
  async sendVerification(): Promise<void> {
    // TODO: Реализовать отправку подтверждения email
    console.log('Email: sendVerification - not implemented');
  }

  /**
   * TODO: Отправить сброс пароля
   */
  async sendPasswordReset(): Promise<void> {
    // TODO: Реализовать отправку сброса пароля
    console.log('Email: sendPasswordReset - not implemented');
  }
}
