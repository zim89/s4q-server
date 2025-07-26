import {
  applyDecorators,
  createParamDecorator,
  UnauthorizedException,
  UseGuards,
  type ExecutionContext,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { JwtGuard } from '../guards/auth.guard'
import type { Request } from 'express'

export function Authorization() {
  return applyDecorators(UseGuards(JwtGuard))
}

export const Authorized = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>()
    const user = req.user as User | undefined

    if (!user) {
      throw new UnauthorizedException()
    }

    return data ? user[data] : user
  },
)
