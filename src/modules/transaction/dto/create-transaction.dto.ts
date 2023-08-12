import { TransactionType } from '@constants/enum';
import { CategoryDto } from '@modules/category/dto/category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @ApiProperty({ type: CategoryDto, isArray: true })
  categories: CategoryDto[];
}
