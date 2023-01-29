import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDonationsRelatedEntities1653516047824
  implements MigrationInterface
{
  name = 'AddDonationsRelatedEntities1653516047824';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "delivery_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "nameId" uuid NOT NULL, "requiredDeliveryInfo" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_399a00e969fa98e5cc1cd97ab3" UNIQUE ("nameId"), CONSTRAINT "PK_b11773f3af6dda5c9069ad1371b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "donation_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "description" text NOT NULL DEFAULT '', "donorId" uuid NOT NULL, "deliveryTypeId" uuid NOT NULL, "hubReceiverId" uuid NOT NULL, "receiverDeliveryInfo" jsonb NOT NULL DEFAULT '[]', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d4f1026169682c637bbb531dc0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "donation_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "requestId" uuid NOT NULL, "productId" uuid NOT NULL, "quantity" double precision NOT NULL, "units" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2739debedda43303f5ec34e6a6b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD "imagePath" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "nickname" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_types" ADD CONSTRAINT "FK_399a00e969fa98e5cc1cd97ab34" FOREIGN KEY ("nameId") REFERENCES "dictionary_phrases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation_requests" ADD CONSTRAINT "FK_537bb3bf49ac7e7e6edb0962b0e" FOREIGN KEY ("donorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation_requests" ADD CONSTRAINT "FK_042620a86643147f424953f17cf" FOREIGN KEY ("deliveryTypeId") REFERENCES "delivery_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation_requests" ADD CONSTRAINT "FK_ee52ee4a088ea3b0f0d85c6eda0" FOREIGN KEY ("hubReceiverId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation_items" ADD CONSTRAINT "FK_19b6f6fa5d38e7a85c3a6813740" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation_items" ADD CONSTRAINT "FK_f9c0edaee3ac2db9de7e08a1c5f" FOREIGN KEY ("requestId") REFERENCES "donation_requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "donation_items" DROP CONSTRAINT "FK_f9c0edaee3ac2db9de7e08a1c5f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation_items" DROP CONSTRAINT "FK_19b6f6fa5d38e7a85c3a6813740"`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation_requests" DROP CONSTRAINT "FK_ee52ee4a088ea3b0f0d85c6eda0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation_requests" DROP CONSTRAINT "FK_042620a86643147f424953f17cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation_requests" DROP CONSTRAINT "FK_537bb3bf49ac7e7e6edb0962b0e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_types" DROP CONSTRAINT "FK_399a00e969fa98e5cc1cd97ab34"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "nickname"`);
    await queryRunner.query(
      `ALTER TABLE "organizations" DROP COLUMN "imagePath"`,
    );
    await queryRunner.query(`DROP TABLE "donation_items"`);
    await queryRunner.query(`DROP TABLE "donation_requests"`);
    await queryRunner.query(`DROP TABLE "delivery_types"`);
  }
}
