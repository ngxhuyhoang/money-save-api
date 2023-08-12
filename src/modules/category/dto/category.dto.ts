import { BasedDto } from '@common/based.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryDto extends BasedDto {
  @ApiProperty()
  name: string;

  constructor(entity: CategoryEntity) {
    super(entity);

    this.name = entity.name;
  }
}
