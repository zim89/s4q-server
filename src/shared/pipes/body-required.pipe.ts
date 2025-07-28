import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class BodyRequiredPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    if (metadata.type === 'body') {
      const isObject =
        typeof value === 'object' && value !== null && !Array.isArray(value);

      const isEmpty =
        value === null ||
        value === undefined ||
        (isObject && Object.keys(value).length === 0);

      if (isEmpty) {
        throw new BadRequestException('Request body is required');
      }
    }
    return value;
  }
}
