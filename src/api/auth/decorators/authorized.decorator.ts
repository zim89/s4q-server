import {
  applyDecorators,
  createParamDecorator,
  type ExecutionContext,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import type { Request } from 'express';
import { JwtGuard } from '../guards/auth.guard';

export function Authorization() {
  return applyDecorators(UseGuards(JwtGuard));
}

export const Authorized = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user as User | undefined;

    if (!user) {
      throw new UnauthorizedException();
    }

    return data ? user[data] : user;
  }
);
