import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderItem } from '../entities/order-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const { orderId, productId, quantity } = data;
    const order = await this.orderRepo.findOneBy({ id: orderId });
    const product = await this.productRepo.findOneBy({ id: productId });

    if (!order) throw new NotFoundException(`Order #${orderId} not found`);
    if (!product)
      throw new NotFoundException(`Product #${productId} not found`);

    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = quantity;

    return this.orderItemRepo.save(item);
  }
}
