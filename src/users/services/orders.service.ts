import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericService } from 'src/common/GenericService.service';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async create(data: CreateOrderDto): Promise<Order> {
    const { customerId } = data;
    const order = new Order();

    if (customerId) {
      const customer = await this.customerRepo.findOneBy({ id: customerId });
      if (!customer)
        throw new NotFoundException(`Customer #${customerId} not found`);

      order.customer = customer;
    }

    return this.orderRepo.save(order);
  }

  async update(id: number, data: UpdateOrderDto): Promise<Order> {
    const { customerId } = data;
    const costumer = await this.customerRepo.findOneBy({ id: customerId });
    if (!costumer)
      throw new NotFoundException(`Customer #${customerId} not found`);

    const order = await this.orderRepo.findOneBy({ id });
    if (!order) throw new NotFoundException(`Order #${id} not found`);

    order.customer = costumer;
    return this.orderRepo.save(order);
  }

  async delete(id: number): Promise<boolean> {
    await this.orderRepo.delete(id);
    return true;
  }

  findAll(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['items', 'customer', 'items.product'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'customer', 'items.product', 'customer.user'],
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);

    return order;
  }

  async ordersByCustomer(customerId: number) {
    const orders = await this.orderRepo.find({
      where: { customer: { id: customerId } },
      relations: ['items', 'customer', 'items.product', 'customer.user'],
    });

    return orders;
  }
}
