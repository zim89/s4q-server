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
import { Card, UserRole } from '@prisma/client';
import {
  CurrentUser,
  JwtGuard,
  RequireRoles,
  RolesGuard,
} from 'src/modules/auth';
import { BodyRequiredPipe } from 'src/shared/pipes';
import { PaginatedResponse } from 'src/shared/types';
import { CardService } from './card.service';
import { CardSwaggerDocs } from './decorators';
import { CardQueryDto, CreateCardDto, UpdateCardDto } from './dto';

@ApiTags('Cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @RequireRoles(UserRole.ADMIN)
  @CardSwaggerDocs.create()
  async create(
    @Body(BodyRequiredPipe) createCardDto: CreateCardDto,
    @CurrentUser('id') userId: string
  ): Promise<Card> {
    return this.cardService.create(createCardDto, userId);
  }

  @Get()
  @CardSwaggerDocs.findAll()
  async findAll(
    @Query() queryDto: CardQueryDto
  ): Promise<PaginatedResponse<Card>> {
    return this.cardService.findAll(queryDto);
  }

  @Get(':id')
  @CardSwaggerDocs.findOne()
  async findOne(@Param('id') id: string): Promise<Card> {
    return this.cardService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @RequireRoles(UserRole.ADMIN)
  @CardSwaggerDocs.update()
  async update(
    @Param('id') id: string,
    @Body(BodyRequiredPipe) updateCardDto: UpdateCardDto
  ): Promise<Card> {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @RequireRoles(UserRole.ADMIN)
  @CardSwaggerDocs.remove()
  async remove(@Param('id') id: string): Promise<void> {
    return this.cardService.remove(id);
  }
}
