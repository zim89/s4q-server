import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ValidationMsgTemplates as msg } from 'src/shared/constants'

export class LoginDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsString({ message: msg.mustBeString('Email') })
  @IsNotEmpty({ message: msg.required('Email') })
  @IsEmail({}, { message: msg.emailFormat })
  email!: string

  @ApiProperty({
    description: 'Password for the user account',
    example: 'securePassword123',
    minLength: 6,
    maxLength: 20,
  })
  @IsString({ message: msg.mustBeString('Password') })
  @IsNotEmpty({ message: msg.required('Password') })
  password!: string
}
