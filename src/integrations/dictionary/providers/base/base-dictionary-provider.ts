import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import {
  DictionaryProviderType,
  ProviderConfig,
  providerConfig,
} from '../../constants';
import { TranscriptionResult, WordInfo } from '../../types';
import {
  DictionaryProvider,
  ProviderStatus,
} from './dictionary-provider.types';

/**
 * Базовый класс для провайдеров словарей
 *
 * Содержит общую логику для всех провайдеров
 */
@Injectable()
export abstract class BaseDictionaryProvider implements DictionaryProvider {
  protected readonly logger = new Logger(this.constructor.name);
  protected status!: ProviderStatus;

  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
    protected readonly providerType: DictionaryProviderType
  ) {
    const config = this.getProviderConfig();
    this.status = {
      name: config.name,
      isAvailable: true,
      isActive: false,
      errorCount: 0,
      successCount: 0,
      averageResponseTime: undefined,
      lastCheck: undefined,
    } as ProviderStatus;
  }

  /**
   * Получить конфигурацию провайдера
   */
  protected getProviderConfig(): ProviderConfig {
    return providerConfig[this.providerType];
  }

  /**
   * Получить название провайдера
   */
  getName(): string {
    return this.getProviderConfig().name;
  }

  /**
   * Получить статус провайдера
   */
  getStatus(): ProviderStatus {
    return { ...this.status };
  }

  /**
   * Проверить доступность провайдера
   */
  isAvailable(): boolean {
    return this.status.isAvailable && this.status.isActive;
  }

  /**
   * Абстрактные методы, которые должны реализовать наследники
   */
  abstract getWordInfo(word: string): Promise<WordInfo | null>;
  abstract getTranscription(word: string): Promise<TranscriptionResult | null>;

  /**
   * Общий метод для выполнения HTTP запросов
   */
  protected async makeRequest<T>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const startTime = Date.now();

    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(url, options)
      );

      const responseTime = Date.now() - startTime;
      this.updateStatus(true, responseTime);

      return response.data;
    } catch (error) {
      this.updateStatus(false);
      throw error;
    }
  }

  /**
   * Обновить статус провайдера
   */
  protected updateStatus(success: boolean, responseTime?: number): void {
    if (success) {
      this.status.successCount++;
      this.status.isAvailable = true;
      this.status.lastCheck = new Date();

      if (responseTime) {
        this.status.averageResponseTime =
          this.calculateAverageResponseTime(responseTime);
      }
    } else {
      this.status.errorCount++;
      this.status.isAvailable = false;
      this.status.lastCheck = new Date();
    }
  }

  /**
   * Рассчитать среднее время ответа
   */
  private calculateAverageResponseTime(newResponseTime: number): number {
    const current = this.status.averageResponseTime ?? 0;
    const count = this.status.successCount;

    return (current * (count - 1) + newResponseTime) / count;
  }

  /**
   * Активировать провайдера
   */
  activate(): void {
    this.status.isActive = true;
    this.logger.log(`Provider ${this.getName()} activated`);
  }

  /**
   * Деактивировать провайдера
   */
  deactivate(): void {
    this.status.isActive = false;
    this.logger.log(`Provider ${this.getName()} deactivated`);
  }
}
