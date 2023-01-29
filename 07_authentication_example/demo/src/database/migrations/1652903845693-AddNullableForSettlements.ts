import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullableForSettlements1652903845693
  implements MigrationInterface
{
  name = 'AddNullableForSettlements1652903845693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "FK_18e0ec1a15f0a5af39243e60ab5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "FK_1ea04aea1ac3149eb4284700fdf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ALTER COLUMN "districtId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ALTER COLUMN "regionId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "FK_1ea04aea1ac3149eb4284700fdf" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "FK_18e0ec1a15f0a5af39243e60ab5" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "FK_18e0ec1a15f0a5af39243e60ab5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "FK_1ea04aea1ac3149eb4284700fdf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ALTER COLUMN "regionId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ALTER COLUMN "districtId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "FK_1ea04aea1ac3149eb4284700fdf" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "FK_18e0ec1a15f0a5af39243e60ab5" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
