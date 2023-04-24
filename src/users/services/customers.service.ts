import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { GenericService } from 'src/common/GenericService.service';

@Injectable()
export class CustomersService extends GenericService<
  Customer,
  number,
  CreateCustomerDto,
  UpdateCustomerDto
> {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {
    super();
  }

  async create(data: CreateCustomerDto): Promise<Customer> {
    const newCustomer = this.customerRepo.create(data);

    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, data: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepo.findOneBy({ id });
    this.customerRepo.merge(customer, data);

    return this.customerRepo.save(customer);
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.customerRepo.delete(id);
      return true;
    } catch (e) {
      return false;
    }
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepo.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException(`The customer #${id} not exist`);
    }

    return customer;
  }
}
