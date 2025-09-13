import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Language, UserRole } from '@prisma/client';
import { JwtGuard, RequireRoles, RolesGuard } from 'src/modules/auth';
import { BodyRequiredPipe } from 'src/shared/pipes';
import { PaginatedResponse } from 'src/shared/types';
import { LanguageSwaggerDocs } from './decorators';
import { CreateLanguageDto, LanguageQueryDto, UpdateLanguageDto } from './dto';
import { LanguageService } from './language.service';

@ApiTags('Languages')
@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @RequireRoles(UserRole.ADMIN)
  @LanguageSwaggerDocs.create()
  async create(
    @Body(BodyRequiredPipe) createLanguageDto: CreateLanguageDto
  ): Promise<Language> {
    return this.languageService.create(createLanguageDto);
  }

  @Get()
  @LanguageSwaggerDocs.findAll()
  async findMany(
    @Query() queryDto: LanguageQueryDto
  ): Promise<PaginatedResponse<Language>> {
    return this.languageService.findMany(queryDto);
  }

  @Get(':id')
  @LanguageSwaggerDocs.findOneById()
  async findOneById(@Param('id') id: string): Promise<Language> {
    return this.languageService.findOneById(id);
  }

  @Get('code/:code')
  @LanguageSwaggerDocs.findOneByCode()
  async findOneByCode(@Param('code') code: string): Promise<Language> {
    return this.languageService.findOneByCode(code);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @RequireRoles(UserRole.ADMIN)
  @LanguageSwaggerDocs.update()
  async update(
    @Param('id') id: string,
    @Body(BodyRequiredPipe) updateLanguageDto: UpdateLanguageDto
  ): Promise<Language> {
    return this.languageService.update(id, updateLanguageDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @RequireRoles(UserRole.ADMIN)
  @LanguageSwaggerDocs.remove()
  async remove(@Param('id') id: string): Promise<void> {
    return this.languageService.remove(id);
  }
}
