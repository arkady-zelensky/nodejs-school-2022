import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SettlementSerializer } from 'src/modules/settlements/serializers/settlement.serializer';

export class SettlementsWithHubsCountSerializer extends SettlementSerializer {
  @ApiProperty()
  @Expose()
  hubsCount: number;
}
