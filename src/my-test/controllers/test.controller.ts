import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestService } from '../services/test.service';
import { CreateTaskDto } from '../dto/task.dto';

@Controller('tasks')
export class TestController {
  constructor(private taskService: TestService) {}

  @Get()
  getAllTask() {
    return this.taskService.findAll();
  }

  @Post()
  saveTask(@Body() task: CreateTaskDto) {
    return this.taskService.create(task);
  }
}
