import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustSchema1652350561561 implements MigrationInterface {
  name = 'AdjustSchema1652350561561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_devices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "deviceToken" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9e7e648903a9e537347aba4371" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organizationId" uuid NOT NULL, "type" character varying NOT NULL, "value" character varying NOT NULL, "verified" boolean NOT NULL, CONSTRAINT "PK_3728fac56883cb199cd707037a0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_involvements" ADD "verified" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD "address" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD "settlementId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_involvements" ADD CONSTRAINT "UQ_7886553dd8602929bb382683917" UNIQUE ("userId", "type")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices" ADD CONSTRAINT "FK_e12ac4f8016243ac71fd2e415af" FOREIGN KEY ("userId") REFERENCES "user_devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_contacts" ADD CONSTRAINT "FK_e9033fdfdbf5bbc867d0153da64" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_contacts" ADD CONSTRAINT "FK_59bd9bf47ba84881ab02da4552c" FOREIGN KEY ("type") REFERENCES "contact_types"("type") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD CONSTRAINT "FK_4568e465f6b95fcae3c3499814c" FOREIGN KEY ("settlementId") REFERENCES "settlements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organizations" DROP CONSTRAINT "FK_4568e465f6b95fcae3c3499814c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_contacts" DROP CONSTRAINT "FK_59bd9bf47ba84881ab02da4552c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_contacts" DROP CONSTRAINT "FK_e9033fdfdbf5bbc867d0153da64"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices" DROP CONSTRAINT "FK_e12ac4f8016243ac71fd2e415af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_involvements" DROP CONSTRAINT "UQ_7886553dd8602929bb382683917"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" DROP COLUMN "settlementId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" DROP COLUMN "address"`,
    );
    await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "user_involvements" DROP COLUMN "verified"`,
    );
    await queryRunner.query(`DROP TABLE "organization_contacts"`);
    await queryRunner.query(`DROP TABLE "user_devices"`);
  }
}
