import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSettlementsTranslations1652901607926
  implements MigrationInterface
{
  name = 'AddSettlementsTranslations1652901607926';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_settlements_name"`);
    await queryRunner.query(
      `CREATE TABLE "districts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nameId" uuid NOT NULL, CONSTRAINT "REL_536fcf658e52a54fd6ea17c7e4" UNIQUE ("nameId"), CONSTRAINT "PK_972a72ff4e3bea5c7f43a2b98af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "regions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nameId" uuid NOT NULL, CONSTRAINT "REL_82ed02e65452a563a32b337312" UNIQUE ("nameId"), CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "settlements" DROP COLUMN "district"`);
    await queryRunner.query(`ALTER TABLE "settlements" DROP COLUMN "region"`);
    await queryRunner.query(`ALTER TABLE "settlements" DROP COLUMN "nameEng"`);
    await queryRunner.query(`ALTER TABLE "settlements" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "settlement_types" ADD "nameId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD "nameId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "UQ_d93c71cf32f76b167828bf3d7e2" UNIQUE ("nameId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD "districtId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD "regionId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "districts" ADD CONSTRAINT "FK_536fcf658e52a54fd6ea17c7e4c" FOREIGN KEY ("nameId") REFERENCES "dictionary_phrases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "regions" ADD CONSTRAINT "FK_82ed02e65452a563a32b337312d" FOREIGN KEY ("nameId") REFERENCES "dictionary_phrases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "FK_1ea04aea1ac3149eb4284700fdf" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "FK_18e0ec1a15f0a5af39243e60ab5" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "FK_d93c71cf32f76b167828bf3d7e2" FOREIGN KEY ("nameId") REFERENCES "dictionary_phrases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "FK_d93c71cf32f76b167828bf3d7e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "FK_18e0ec1a15f0a5af39243e60ab5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "FK_1ea04aea1ac3149eb4284700fdf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "regions" DROP CONSTRAINT "FK_82ed02e65452a563a32b337312d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "districts" DROP CONSTRAINT "FK_536fcf658e52a54fd6ea17c7e4c"`,
    );
    await queryRunner.query(`ALTER TABLE "settlements" DROP COLUMN "regionId"`);
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP COLUMN "districtId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "UQ_d93c71cf32f76b167828bf3d7e2"`,
    );
    await queryRunner.query(`ALTER TABLE "settlements" DROP COLUMN "nameId"`);
    await queryRunner.query(
      `ALTER TABLE "settlement_types" DROP COLUMN "nameId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD "nameEng" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD "region" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD "district" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(`DROP TABLE "regions"`);
    await queryRunner.query(`DROP TABLE "districts"`);
    await queryRunner.query(
      `CREATE INDEX "idx_settlements_name" ON "settlements" ("name") `,
    );
  }
}
