import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './auth/decorator/public.decorator';

@Controller({ version: '1' })
@ApiTags('Default')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @Public()
  @ApiOperation({ summary: 'Health check API' })
  async getHealth() {
    return this.appService.getHealth();
  }
}
