import { Body, Controller, Post } from '@nestjs/common';
import { OrderItemService } from '../services/order-item.service';
import { CreateOrderItemDto } from '../dtos/order-item.dto';

@Controller('orders-item')
export class OrdersItemController {
  constructor(private itemsService: OrderItemService) {}

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemsService.create(payload);
  }
}
