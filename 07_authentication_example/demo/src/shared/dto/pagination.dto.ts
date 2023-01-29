import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Max } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ name: 'pagination[page]' })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  page: number;

  @ApiProperty({ name: 'pagination[size]' })
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @Max(100)
  size: number;

  getOffset(): number {
    return (this.page - 1) * this.size;
  }

  getLimit(): number {
    return this.size;
  }
}
