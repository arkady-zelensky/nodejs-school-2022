import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMainTables1652022344096 implements MigrationInterface {
  name = 'AddMainTables1652022344096';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "involvement_types" ("type" character varying NOT NULL, CONSTRAINT "PK_df16eb0a021501622c34ec19d0b" PRIMARY KEY ("type"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_involvements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_917d79b941fab921e715a6c3278" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_types" ("type" character varying NOT NULL, CONSTRAINT "PK_5940982ec542b3962df1f9b50c4" PRIMARY KEY ("type"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "createdBy" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact_types" ("type" character varying NOT NULL, CONSTRAINT "PK_203b319266f9cf4e539cd0210ff" PRIMARY KEY ("type"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "settlement_types" ("type" character varying NOT NULL, CONSTRAINT "PK_c2938e3b615d95b5a83824ae2a6" PRIMARY KEY ("type"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "settlements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "centerLocation" geography(Point,4326), "createdBy" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5f523ce152b84e818bff9467aab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "volunteer_hubs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organizationId" uuid NOT NULL, "settlementId" uuid NOT NULL, "createdBy" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cfe31253a6b2c4a6471018a13dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hub_contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organizationId" uuid NOT NULL, "hubId" uuid NOT NULL, "type" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_c18dc58e86fab7621c72786bb3e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rides" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "driverId" uuid NOT NULL, "departureSettlementId" uuid NOT NULL, "arrivalSettlementId" uuid NOT NULL, "status" character varying NOT NULL, "estDepartureTime" TIMESTAMP WITH TIME ZONE NOT NULL, "estArrivalTime" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ca6f62fc1e999b139c7f28f07fd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "volunteer_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, "settlementId" uuid NOT NULL, "organizationId" uuid NOT NULL, "comment" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d8fb6573a380c24c8f7b76a92f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "volunteer_request_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "requestId" uuid NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "quantityUnits" character varying NOT NULL, "imagePath" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d73aa3f698b991733bee14241e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordHash"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "verificationToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "passwordHash" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "verificationToken" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_involvements" ADD CONSTRAINT "FK_a58787753bf3a21a7046c3c8950" FOREIGN KEY ("type") REFERENCES "involvement_types"("type") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_involvements" ADD CONSTRAINT "FK_e643f9d23b5f9f614f7fbade183" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD CONSTRAINT "FK_5a8e0c18328a68facab7f011327" FOREIGN KEY ("type") REFERENCES "organization_types"("type") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD CONSTRAINT "FK_1ed0e272bfdf49ab50e7b9a40c5" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "FK_3711842bf75186ae18c3d777eb7" FOREIGN KEY ("type") REFERENCES "settlement_types"("type") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" ADD CONSTRAINT "FK_3ce207e0b9c00e78cef20d588ea" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "volunteer_hubs" ADD CONSTRAINT "FK_2f679f47b9e23a3bd372754da1c" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "volunteer_hubs" ADD CONSTRAINT "FK_66853212241bf78865eaf86e6f1" FOREIGN KEY ("settlementId") REFERENCES "settlements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "volunteer_hubs" ADD CONSTRAINT "FK_959d31c794fe9da4f339aac5183" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hub_contacts" ADD CONSTRAINT "FK_23443d29ebc1fa271b1289b336a" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hub_contacts" ADD CONSTRAINT "FK_9e81c1d4103258e968177208b9c" FOREIGN KEY ("hubId") REFERENCES "volunteer_hubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rides" ADD CONSTRAINT "FK_0adda088d567495e71d21b6c691" FOREIGN KEY ("driverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rides" ADD CONSTRAINT "FK_f9a57932f90fc091d83b0637e78" FOREIGN KEY ("departureSettlementId") REFERENCES "settlements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rides" ADD CONSTRAINT "FK_389e1d7dd4275ee357f5a6a8c2a" FOREIGN KEY ("arrivalSettlementId") REFERENCES "settlements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "volunteer_requests" ADD CONSTRAINT "FK_12921811ff09f9ec0cb626e181b" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "volunteer_requests" ADD CONSTRAINT "FK_02c4c029ddd88032c0dd49f739a" FOREIGN KEY ("settlementId") REFERENCES "settlements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "volunteer_request_items" ADD CONSTRAINT "FK_4eb8239bec096567ea30c82518a" FOREIGN KEY ("requestId") REFERENCES "settlements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "volunteer_request_items" DROP CONSTRAINT "FK_4eb8239bec096567ea30c82518a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "volunteer_requests" DROP CONSTRAINT "FK_02c4c029ddd88032c0dd49f739a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "volunteer_requests" DROP CONSTRAINT "FK_12921811ff09f9ec0cb626e181b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rides" DROP CONSTRAINT "FK_389e1d7dd4275ee357f5a6a8c2a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rides" DROP CONSTRAINT "FK_f9a57932f90fc091d83b0637e78"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rides" DROP CONSTRAINT "FK_0adda088d567495e71d21b6c691"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hub_contacts" DROP CONSTRAINT "FK_9e81c1d4103258e968177208b9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hub_contacts" DROP CONSTRAINT "FK_23443d29ebc1fa271b1289b336a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "volunteer_hubs" DROP CONSTRAINT "FK_959d31c794fe9da4f339aac5183"`,
    );
    await queryRunner.query(
      `ALTER TABLE "volunteer_hubs" DROP CONSTRAINT "FK_66853212241bf78865eaf86e6f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "volunteer_hubs" DROP CONSTRAINT "FK_2f679f47b9e23a3bd372754da1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "FK_3ce207e0b9c00e78cef20d588ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settlements" DROP CONSTRAINT "FK_3711842bf75186ae18c3d777eb7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" DROP CONSTRAINT "FK_1ed0e272bfdf49ab50e7b9a40c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" DROP CONSTRAINT "FK_5a8e0c18328a68facab7f011327"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_involvements" DROP CONSTRAINT "FK_e643f9d23b5f9f614f7fbade183"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_involvements" DROP CONSTRAINT "FK_a58787753bf3a21a7046c3c8950"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "verificationToken"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordHash"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "verificationToken" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "passwordHash" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(`DROP TABLE "volunteer_request_items"`);
    await queryRunner.query(`DROP TABLE "volunteer_requests"`);
    await queryRunner.query(`DROP TABLE "rides"`);
    await queryRunner.query(`DROP TABLE "hub_contacts"`);
    await queryRunner.query(`DROP TABLE "volunteer_hubs"`);
    await queryRunner.query(`DROP TABLE "settlements"`);
    await queryRunner.query(`DROP TABLE "settlement_types"`);
    await queryRunner.query(`DROP TABLE "contact_types"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
    await queryRunner.query(`DROP TABLE "organization_types"`);
    await queryRunner.query(`DROP TABLE "user_involvements"`);
    await queryRunner.query(`DROP TABLE "involvement_types"`);
  }
}
