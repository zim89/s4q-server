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
import { Set, UserRole } from '@prisma/client';
import {
  CurrentUser,
  JwtGuard,
  RequireRoles,
  RolesGuard,
} from 'src/modules/auth';
import { BodyRequiredPipe } from 'src/shared/pipes';
import { PaginatedResponse } from 'src/shared/types';
import { SetSwaggerDocs } from './decorators';
import { CreateSetDto, SetQueryDto, UpdateSetDto } from './dto';
import { SetService } from './set.service';

@ApiTags('sets')
@Controller('sets')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @RequireRoles(UserRole.ADMIN)
  @SetSwaggerDocs.create()
  async create(
    @Body(BodyRequiredPipe) createSetDto: CreateSetDto,
    @CurrentUser('id') userId: string
  ): Promise<Set> {
    return this.setService.create(createSetDto, userId);
  }

  @Get()
  @SetSwaggerDocs.findAll()
  async findAll(
    @Query() queryDto: SetQueryDto
  ): Promise<PaginatedResponse<Set>> {
    return this.setService.findAll(queryDto);
  }

  @Get(':id')
  @SetSwaggerDocs.findOne()
  async findOne(@Param('id') id: string): Promise<Set> {
    return this.setService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @RequireRoles(UserRole.ADMIN)
  @SetSwaggerDocs.update()
  async update(
    @Param('id') id: string,
    @Body(BodyRequiredPipe) updateSetDto: UpdateSetDto
  ): Promise<Set> {
    return this.setService.update(id, updateSetDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @RequireRoles(UserRole.ADMIN)
  @SetSwaggerDocs.remove()
  async remove(@Param('id') id: string): Promise<void> {
    return this.setService.remove(id);
  }

  @Post(':id/cards/:cardId')
  @UseGuards(JwtGuard, RolesGuard)
  @RequireRoles(UserRole.ADMIN)
  @SetSwaggerDocs.addCardToSet()
  async addCardToSet(
    @Param('id') setId: string,
    @Param('cardId') cardId: string
  ): Promise<void> {
    return this.setService.addCardToSet(setId, cardId);
  }

  @Delete(':id/cards/:cardId')
  @UseGuards(JwtGuard, RolesGuard)
  @RequireRoles(UserRole.ADMIN)
  @SetSwaggerDocs.removeCardFromSet()
  async removeCardFromSet(
    @Param('id') setId: string,
    @Param('cardId') cardId: string
  ): Promise<void> {
    return this.setService.removeCardFromSet(setId, cardId);
  }
}
