import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHumDeliveries1666123404829 implements MigrationInterface {
  name = 'AddHumDeliveries1666123404829';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hum_delivery_pickup_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pickupId" uuid NOT NULL, "productId" uuid NOT NULL, "received" boolean NOT NULL, "estQuantity" integer NOT NULL, "actualQuantity" integer, "units" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "driverComment" character varying NOT NULL DEFAULT '', "hubComment" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0ab3582fbfdf638f21999fb9b66" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hum_delivery_pickups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deliveryId" uuid NOT NULL, "hubId" uuid NOT NULL, "status" character varying NOT NULL, "estPickupTime" TIMESTAMP, "actualPickupTime" TIMESTAMP, "hubComment" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3599ca09c8c53d193832ddecbf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hum_deliveries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "driverId" uuid NOT NULL, "recipientId" uuid NOT NULL, "status" character varying NOT NULL, "estArrivalTime" TIMESTAMP, "actualArrivalTime" TIMESTAMP, "routeCurve" geography(LineString) NOT NULL, "description" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "receiverId" uuid, CONSTRAINT "PK_0baf216efc2d66d4f1626628b8d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hum_delivery_items_received" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deliveryId" uuid NOT NULL, "productId" uuid NOT NULL, "received" boolean NOT NULL, "estQuantity" integer NOT NULL, "actualQuantity" integer, "units" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "driverComment" character varying NOT NULL DEFAULT '', "recipientComment" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c64d35597042ace67222d6adad3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_delivery_pickup_items" ADD CONSTRAINT "FK_673f64ea0af6863ca25168916bc" FOREIGN KEY ("pickupId") REFERENCES "hum_delivery_pickups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_delivery_pickup_items" ADD CONSTRAINT "FK_0131e19afc5a039a2ddaffe601e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_delivery_pickups" ADD CONSTRAINT "FK_55c121687fc6d1e459c017892d8" FOREIGN KEY ("deliveryId") REFERENCES "hum_deliveries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_delivery_pickups" ADD CONSTRAINT "FK_49993b5e39ce4f852163edd1288" FOREIGN KEY ("hubId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_deliveries" ADD CONSTRAINT "FK_ff5d62e18e9bd10dc6b8ac2a91d" FOREIGN KEY ("driverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_deliveries" ADD CONSTRAINT "FK_0a8d0e83294968b60019a2f29a8" FOREIGN KEY ("receiverId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_delivery_items_received" ADD CONSTRAINT "FK_42dcc1d554b893b03f17a734e95" FOREIGN KEY ("deliveryId") REFERENCES "hum_deliveries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_delivery_items_received" ADD CONSTRAINT "FK_8c612b6af3b26b83ffaa58cdd6d" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hum_delivery_items_received" DROP CONSTRAINT "FK_8c612b6af3b26b83ffaa58cdd6d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_delivery_items_received" DROP CONSTRAINT "FK_42dcc1d554b893b03f17a734e95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_deliveries" DROP CONSTRAINT "FK_0a8d0e83294968b60019a2f29a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_deliveries" DROP CONSTRAINT "FK_ff5d62e18e9bd10dc6b8ac2a91d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_delivery_pickups" DROP CONSTRAINT "FK_49993b5e39ce4f852163edd1288"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_delivery_pickups" DROP CONSTRAINT "FK_55c121687fc6d1e459c017892d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_delivery_pickup_items" DROP CONSTRAINT "FK_0131e19afc5a039a2ddaffe601e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hum_delivery_pickup_items" DROP CONSTRAINT "FK_673f64ea0af6863ca25168916bc"`,
    );
    await queryRunner.query(`DROP TABLE "hum_delivery_items_received"`);
    await queryRunner.query(`DROP TABLE "hum_deliveries"`);
    await queryRunner.query(`DROP TABLE "hum_delivery_pickups"`);
    await queryRunner.query(`DROP TABLE "hum_delivery_pickup_items"`);
  }
}
