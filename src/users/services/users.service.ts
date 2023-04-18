import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from './../../products/services/products.service';
import { GenericService } from 'src/common/GenericService.service';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService extends GenericService<
  User,
  number,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customerServices: CustomersService,
  ) {
    super();
  }

  async create(data: CreateUserDto): Promise<User> {
    const newUser = this.userRepo.create(data);

    if (data.customerId) {
      const customer = await this.customerServices.findOne(data.customerId);
      newUser.customer = customer;
    }

    return this.userRepo.save(newUser);
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    this.userRepo.merge(user, data);

    return this.userRepo.save(user);
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.userRepo.delete(id);
      return true;
    } catch (e) {
      return false;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find({ relations: ['customer'] });
  }

  async findOne(id: number): Promise<User> {
    const product = await this.userRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return product;
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
