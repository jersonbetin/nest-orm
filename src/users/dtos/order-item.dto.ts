import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly orderId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly productId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
