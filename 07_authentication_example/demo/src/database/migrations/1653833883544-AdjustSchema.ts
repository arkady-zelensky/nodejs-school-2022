import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustSchema1653833883544 implements MigrationInterface {
  name = 'AdjustSchema1653833883544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_17e19c05cb1da4070f68f83c8e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ALTER COLUMN "verified" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_17e19c05cb1da4070f68f83c8e4" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_17e19c05cb1da4070f68f83c8e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ALTER COLUMN "verified" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_17e19c05cb1da4070f68f83c8e4" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
