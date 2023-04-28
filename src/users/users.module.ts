import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './entities/customer.entity';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';

import { ProductsModule } from '../products/products.module';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-product.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemService } from './services/order-item.service';
import { OrdersItemController } from './controllers/orders-item.controller';
import { Product } from 'src/products/entities/product.entity';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([Customer, User, Order, OrderItem, Product]),
  ],
  controllers: [
    CustomerController,
    UsersController,
    OrdersController,
    OrdersItemController,
    ProfileController,
  ],
  providers: [CustomersService, UsersService, OrdersService, OrderItemService],
  exports: [UsersService],
})
export class UsersModule {}
