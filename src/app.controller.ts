import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('test')
  tasks() {
    return this.appService.getTasks();
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }
}
