import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ExposeTranslation } from 'src/shared/decorators/transform-obj.decorator';

export class ContactTypeSerializer {
  @ApiProperty()
  @Expose()
  type: string;

  @ApiProperty()
  @ExposeTranslation('name')
  name: string;
}
