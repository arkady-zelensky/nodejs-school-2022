import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecepientNeedsTable1655583604705 implements MigrationInterface {
  name = 'AddRecepientNeedsTable1655583604705';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hub_warehouse_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hubId" uuid NOT NULL, "productId" uuid NOT NULL, "quantity" double precision NOT NULL, "desiredQuantity" integer NOT NULL, "units" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1c916ca53688a13597ae20120f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipient_needs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recipientId" uuid NOT NULL, "productId" uuid NOT NULL, "quantity" double precision NOT NULL, "desiredQuantity" integer NOT NULL, "units" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_668f51bce94c6a1b0528561406e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "hub_warehouse_items" ADD CONSTRAINT "FK_6df27160713fc53aa2d6a5de168" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hub_warehouse_items" ADD CONSTRAINT "FK_0ad80a7667671386aa5f82de1b2" FOREIGN KEY ("hubId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipient_needs" ADD CONSTRAINT "FK_fd4b6c89f99af232d568e2261bb" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipient_needs" ADD CONSTRAINT "FK_429dcc9e0e9e80d771f8347bcd8" FOREIGN KEY ("recipientId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipient_needs" DROP CONSTRAINT "FK_429dcc9e0e9e80d771f8347bcd8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipient_needs" DROP CONSTRAINT "FK_fd4b6c89f99af232d568e2261bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hub_warehouse_items" DROP CONSTRAINT "FK_0ad80a7667671386aa5f82de1b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hub_warehouse_items" DROP CONSTRAINT "FK_6df27160713fc53aa2d6a5de168"`,
    );
    await queryRunner.query(`DROP TABLE "recipient_needs"`);
    await queryRunner.query(`DROP TABLE "hub_warehouse_items"`);
  }
}
