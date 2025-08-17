import { ApiPropertyOptional } from '@nestjs/swagger';
import { ContentCategory, LanguageLevel, SetType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  SetSortField,
  setSortFieldValues,
  SortOrder,
  sortOrderValues,
} from 'src/shared/constants/sort';
import { PaginationDto } from 'src/shared/dto';

export class SetQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Тип набора',
    enum: SetType,
    example: SetType.LANGUAGE,
  })
  @IsOptional()
  @IsEnum(SetType)
  type?: SetType;

  @ApiPropertyOptional({
    description: 'Уровень сложности',
    enum: LanguageLevel,
    example: LanguageLevel.A1,
  })
  @IsOptional()
  @IsEnum(LanguageLevel)
  level?: LanguageLevel;

  @ApiPropertyOptional({
    description: 'Категория контента',
    enum: ContentCategory,
    example: ContentCategory.EDUCATIONAL,
  })
  @IsOptional()
  @IsEnum(ContentCategory)
  contentCategory?: ContentCategory;

  @ApiPropertyOptional({
    description: 'Поиск по названию',
    example: 'english words',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Поле для сортировки',
    enum: setSortFieldValues,
    example: setSortFieldValues[0],
  })
  @IsOptional()
  @IsEnum(setSortFieldValues)
  sort?: SetSortField;

  @ApiPropertyOptional({
    description: 'Порядок сортировки',
    enum: sortOrderValues,
    example: sortOrderValues[1],
  })
  @IsOptional()
  @IsEnum(sortOrderValues)
  order?: SortOrder;
}
