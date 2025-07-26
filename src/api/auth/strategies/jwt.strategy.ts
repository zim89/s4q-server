import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { ConfigService } from '@nestjs/config'
import { EnvKeys } from 'src/config/env/env.constants'
import type { JwtPayload } from '../types/jwt-payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>(EnvKeys.JWT_SECRET),
      algorithms: ['HS256'],
    })
  }

  async validate(payload: JwtPayload) {
    return await this.authService.validate(payload.id)
  }
}
