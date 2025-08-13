import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { validationMessages as msg } from 'src/shared/constants';

/**
 * Data Transfer Object for user login
 *
 * Contains credentials for user authentication
 * with validation rules and Swagger documentation
 *
 * @example
 * // Login user
 * const loginDto: LoginDto = {
 *   email: 'john.doe@example.com',
 *   password: 'securePassword123'
 * };
 */
export class LoginDto {
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
  password!: string;
}
