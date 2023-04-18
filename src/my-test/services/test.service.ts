import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/common/GenericService.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TestService extends GenericService<
  Task,
  string,
  CreateTaskDto,
  UpdateTaskDto
> {
  constructor(@InjectRepository(Task) private taskRep: Repository<Task>) {
    super();
  }

  create(data: CreateTaskDto): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: UpdateTaskDto): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<Task> {
    throw new Error('Method not implemented.');
  }
}
