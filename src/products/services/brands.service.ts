import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { GenericService } from 'src/common/GenericService.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService extends GenericService<
  Brand,
  number,
  CreateBrandDto,
  UpdateBrandDto
> {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {
    super();
  }

  create(data: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepo.create(data);

    return this.brandRepo.save(brand);
  }

  async update(id: number, data: UpdateBrandDto): Promise<Brand> {
    const brand = await this.brandRepo.findOneBy({ id });
    this.brandRepo.merge(brand, data);

    return this.brandRepo.save(brand);
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.brandRepo.delete(id);
      return true;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandRepo.find();
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandRepo.findOne({
      where: { id },
      relations: ['products'],
    });

    if (brand) return brand;

    throw new NotFoundException(`Brand #${id} not found`);
  }
}
