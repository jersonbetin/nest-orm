import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { GenericService } from 'src/common/GenericService.service';

@Injectable()
export class CategoriesService extends GenericService<
  Category,
  number,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {
    super();
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.categoryRepo.create(data);

    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, data: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepo.findOne(id);
    this.categoryRepo.merge(category, data);

    return this.categoryRepo.save(category);
  }

  async delete(id: number): Promise<boolean> {
    await this.categoryRepo.delete(id);
    return true;
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepo.find({
      relations: ['products'],
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne(id, {
      relations: ['products'],
    });

    if (category) {
      return category;
    }

    throw new NotFoundException(`Category #${id} not found`);
  }
}
