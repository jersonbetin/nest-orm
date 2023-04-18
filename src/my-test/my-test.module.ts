import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestService } from './services/test.service';
import { TestController } from './controllers/test.controller';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TestService],
  controllers: [TestController],
})
export class MyTestModule {}
