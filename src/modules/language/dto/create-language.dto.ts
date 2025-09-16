import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LanguageSwaggerSchemas } from '../schemas/language-swagger.schemas';

export class CreateLanguageDto {
  @ApiProperty({
    ...LanguageSwaggerSchemas.name,
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @ApiProperty({
    ...LanguageSwaggerSchemas.code,
    minLength: 2,
    maxLength: 5,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(5)
  code!: string;

  @ApiProperty({
    ...LanguageSwaggerSchemas.isEnabled,
    default: true,
    required: false,
  })
  @IsBoolean()
  isEnabled?: boolean = true;
}
