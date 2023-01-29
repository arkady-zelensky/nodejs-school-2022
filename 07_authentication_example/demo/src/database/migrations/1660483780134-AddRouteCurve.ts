import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRouteCurve1660483780134 implements MigrationInterface {
  name = 'AddRouteCurve1660483780134';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rides" ADD "routeCurve" geography(LineString)`,
    );
    await queryRunner.query(
      `UPDATE rides AS r SET "routeCurve" = (
        SELECT ST_GeographyFromText(CONCAT('LineString(', (
            SELECT "centerLocation"
            FROM settlements
            WHERE id = r."departureSettlementId"
        ), ', ', (
            SELECT "centerLocation"
            FROM settlements
            WHERE id = r."arrivalSettlementId"
        ), ')')))`,
    );
    await queryRunner.query(
      `ALTER TABLE "rides" ALTER COLUMN "routeCurve" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "routeCurve"`);
  }
}
