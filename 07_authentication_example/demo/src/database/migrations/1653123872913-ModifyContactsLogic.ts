import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyContactsLogic1653123872913 implements MigrationInterface {
  name = 'ModifyContactsLogic1653123872913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organizationId" uuid, "userId" uuid, "accessMode" character varying NOT NULL, "type" character varying NOT NULL, "value" character varying NOT NULL, "verified" boolean NOT NULL, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact_accesses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contactId" uuid NOT NULL, "organizationId" uuid, "userId" uuid, "type" character varying NOT NULL, CONSTRAINT "PK_e0517a0527572d32155c6911dae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_types" ADD "nameId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_types" ADD CONSTRAINT "UQ_325340ec69c034fcb1a8ba7bef4" UNIQUE ("nameId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_types" ADD CONSTRAINT "FK_325340ec69c034fcb1a8ba7bef4" FOREIGN KEY ("nameId") REFERENCES "dictionary_phrases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_17e19c05cb1da4070f68f83c8e4" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_325cc53db170df8ded4fdf6709b" FOREIGN KEY ("type") REFERENCES "contact_types"("type") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_accesses" ADD CONSTRAINT "FK_e7b326af16ac69d5f5496b2a1f9" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_accesses" ADD CONSTRAINT "FK_11428d049460681e43942e66763" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_accesses" ADD CONSTRAINT "FK_9b905f2932056bba5b6edf7ddc0" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_accesses" DROP CONSTRAINT "FK_9b905f2932056bba5b6edf7ddc0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_accesses" DROP CONSTRAINT "FK_11428d049460681e43942e66763"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_accesses" DROP CONSTRAINT "FK_e7b326af16ac69d5f5496b2a1f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_325cc53db170df8ded4fdf6709b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_17e19c05cb1da4070f68f83c8e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_types" DROP CONSTRAINT "FK_325340ec69c034fcb1a8ba7bef4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_types" DROP CONSTRAINT "UQ_325340ec69c034fcb1a8ba7bef4"`,
    );
    await queryRunner.query(`ALTER TABLE "contact_types" DROP COLUMN "nameId"`);
    await queryRunner.query(`DROP TABLE "contact_accesses"`);
    await queryRunner.query(`DROP TABLE "contacts"`);
  }
}
