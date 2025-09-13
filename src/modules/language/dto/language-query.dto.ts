import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class LanguageQueryDto {
  @ApiPropertyOptional({
    description: 'Фильтр по активности языка',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value as boolean;
  })
  isEnabled?: boolean;

  @ApiPropertyOptional({
    description: 'Поиск по названию или коду языка',
    example: 'english',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
