import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { errorMessages } from 'src/shared/constants';

/**
 * Pipe to validate that request body is present and not empty
 *
 * Validates:
 * - Body is not null or undefined
 * - Body is not an empty object
 * - Body is not an empty array
 * - Body is not an empty string
 *
 * @example
 * // Use pipe at method level
 * @Post('create')
 * @UsePipes(BodyRequiredPipe)
 * createUser(@Body() createUserDto: CreateUserDto) {
 *   return this.userService.create(createUserDto);
 * }
 *
 * @example
 * // Use pipe at parameter level
 * @Post('update')
 * updateUser(
 *   @Body(BodyRequiredPipe) updateUserDto: UpdateUserDto
 * ) {
 *   return this.userService.update(updateUserDto);
 * }
 */
@Injectable()
export class BodyRequiredPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    // Only validate body parameters
    if (metadata.type !== 'body') {
      return value;
    }

    // Check if value is null or undefined
    if (value === null || value === undefined) {
      throw new BadRequestException(errorMessages.common.badRequestBody);
    }

    // Check if value is an empty string
    if (typeof value === 'string' && value.trim() === '') {
      throw new BadRequestException(errorMessages.common.badRequestBody);
    }

    // Check if value is an empty array
    if (Array.isArray(value) && value.length === 0) {
      throw new BadRequestException(errorMessages.common.badRequestBody);
    }

    // Check if value is an empty object
    if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0
    ) {
      throw new BadRequestException(errorMessages.common.badRequestBody);
    }

    return value;
  }
}
