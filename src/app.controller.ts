import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get('health')
  healthCheck() {
    return { status: 'ok' }
  }

  @Get('version')
  version() {
    return { version: process.env.npm_package_version }
  }
}
