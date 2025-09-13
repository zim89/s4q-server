import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({
    description: 'Название языка (например, "English", "Deutsch")',
    example: 'English',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @ApiProperty({
    description: 'Код языка по ISO 639-1 (например, "en", "de")',
    example: 'en',
    minLength: 2,
    maxLength: 5,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(5)
  code!: string;

  @ApiProperty({
    description: 'Активен ли язык в системе',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  isEnabled?: boolean = true;
}
