import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveSettlementID1675632187295 implements MigrationInterface {
  name = "RemoveSettlementID1675632187295";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organizations" DROP COLUMN "settlementId"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD "settlementId" character varying NOT NULL`
    );
  }
}
