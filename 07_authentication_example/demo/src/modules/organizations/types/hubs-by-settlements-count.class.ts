import { SettlementEntity } from 'src/modules/settlements/db/settlement.entity';

export class HubsBySettlementsCount extends SettlementEntity {
  hubsCount?: number;
}

export interface HubsCountBySettlementId {
  settlementId: string;
  hubsCount: number;
}
