import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './../dtos/products.dtos';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ) {}

  findAll(params?: FilterProductsDto) {
    const { offset, limit, maxPrice, minPrice } = params;
    let options = {};
    const where: FindOptionsWhere<Product> = {};

    if (offset && limit) {
      options = {
        skip: offset,
        take: limit,
      };
    }

    if (minPrice && maxPrice) {
      where.price = Between(minPrice, maxPrice);
    }

    return this.productRepo.find({
      relations: ['brand', 'categories'],
      where,
      ...options,
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const { brandId, categoriesIds } = data;
    const brand: Brand = await this.brandRepo.findOne({
      where: { id: brandId },
    });

    if (brand) {
      const newProduct = this.productRepo.create(data);
      newProduct.brand = brand;

      if (categoriesIds) {
        const categories = await this.categoryRepo.findBy({
          id: In(categoriesIds),
        });

        newProduct.categories = categories;
      }

      return this.productRepo.save(newProduct);
    } else {
      throw new NotFoundException('You must send a valid brand');
    }
  }

  async update(id: number, changes: UpdateProductDto) {
    const { brandId, categoriesIds } = changes;

    const product = await this.productRepo.findOneBy({
      id,
    });

    if (brandId) {
      const brand: Brand = await this.brandRepo.findOneBy({
        id: brandId,
      });
      product.brand = brand;
    }

    if (categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(categoriesIds),
      });
      product.categories = categories;
    }

    this.productRepo.merge(product, changes);

    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }

  async removeCategoryByProductId(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );

    return this.productRepo.save(product);
  }

  async addCategoryByProductId(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    const category = await this.categoryRepo.findOneBy({ id: categoryId });

    if (!category) {
      throw new NotFoundException(`category #${categoryId} not found`);
    }
    product.categories.push(category);

    return this.productRepo.save(product);
  }
}
