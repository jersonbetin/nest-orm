import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { BrandsService } from './brands.service';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandService: BrandsService,
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const brand = await this.brandService.findOne(data.brandId);
    if (brand) {
      const newProduct = this.productRepo.create(data);
      newProduct.brand = brand;

      return this.productRepo.save(newProduct);
    } else {
      throw new NotFoundException('You must send a valid brand');
    }
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    const brand = await this.brandService.findOne(changes.brandId);

    if (brand) {
      product.brand = brand;
    }

    this.productRepo.merge(product, changes);

    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
