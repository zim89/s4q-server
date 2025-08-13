import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { validationMessages as msg } from 'src/shared/constants';

/**
 * Data Transfer Object for user registration
 *
 * Contains all required fields for creating a new user account
 * with validation rules and Swagger documentation
 *
 * @example
 * // Register new user
 * const registerDto: RegisterDto = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   password: 'securePassword123'
 * };
 */
export class RegisterDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    maxLength: 50,
  })
  @IsString({ message: msg.mustBeString('First name') })
  @IsNotEmpty({ message: msg.required('First name') })
  @MaxLength(50, { message: msg.maxLength('First name', 50) })
  firstName!: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    maxLength: 50,
  })
  @IsString({ message: msg.mustBeString('Last name') })
  @IsNotEmpty({ message: msg.required('Last name') })
  @MaxLength(50, { message: msg.maxLength('Last name', 50) })
  lastName!: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsString({ message: msg.mustBeString('Email') })
  @IsNotEmpty({ message: msg.required('Email') })
  @IsEmail({}, { message: msg.emailFormat })
  email!: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'securePassword123',
    minLength: 6,
    maxLength: 20,
  })
  @IsString({ message: msg.mustBeString('Password') })
  @IsNotEmpty({ message: msg.required('Password') })
  @MinLength(6, { message: msg.minLength('Password', 6) })
  @MaxLength(20, { message: msg.maxLength('Password', 20) })
  password!: string;
}
