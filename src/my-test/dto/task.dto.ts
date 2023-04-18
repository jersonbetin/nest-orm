import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsBoolean()
  @ApiProperty()
  completed?: boolean = false;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
