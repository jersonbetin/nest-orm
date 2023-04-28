import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/rol.model';
import { PayloadToken } from 'src/auth/models/toke.model';
import { OrdersService } from '../services/orders.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class ProfileController {
  constructor(private orderService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const { sub } = req.user as PayloadToken;
    return this.orderService.ordersByCustomer(sub);
  }
}
