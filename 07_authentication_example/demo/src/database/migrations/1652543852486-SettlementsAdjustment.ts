import { MigrationInterface, QueryRunner } from 'typeorm';

export class SettlementsAdjustment1652543852486 implements MigrationInterface {
  name = 'SettlementsAdjustment1652543852486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "countries" ("code" character varying NOT NULL, "name" character varying NOT NULL, "nameEng" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b47cbb5311bad9c9ae17b8c1eda" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD "district" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD "region" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD "nameEng" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD "countryCode" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD "postalCode" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "FK_3ce207e0b9c00e78cef20d588ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ALTER COLUMN "createdBy" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "FK_34f15f9b9832708ecc40a5e8aa8" FOREIGN KEY ("countryCode") REFERENCES "countries"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "FK_3ce207e0b9c00e78cef20d588ea" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE INDEX idx_settlements_name ON settlements USING gist ("name" gist_trgm_ops);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX idx_settlements_name`);
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "FK_3ce207e0b9c00e78cef20d588ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "FK_34f15f9b9832708ecc40a5e8aa8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ALTER COLUMN "createdBy" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "FK_3ce207e0b9c00e78cef20d588ea" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP COLUMN "postalCode"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP COLUMN "countryCode"`,
    );
    await queryRunner.query(`ALTER TABLE "settlements" DROP COLUMN "nameEng"`);
    await queryRunner.query(`ALTER TABLE "settlements" DROP COLUMN "region"`);
    await queryRunner.query(`ALTER TABLE "settlements" DROP COLUMN "district"`);
    await queryRunner.query(`DROP TABLE "countries"`);
  }
}
