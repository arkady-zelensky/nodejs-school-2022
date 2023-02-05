import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1675530369537 implements MigrationInterface {
  name = "Initial1675530369537";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "languages" ("code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7397752718d1c9eb873722ec9b2" PRIMARY KEY ("code"))`
    );
    await queryRunner.query(
      `CREATE TABLE "dictionary_localizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "language" character varying NOT NULL, "phraseId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89399f3e700ba602430ac9f644b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "idx_localizations_text" ON "dictionary_localizations" ("text") `
    );
    await queryRunner.query(
      `CREATE TABLE "dictionary_phrases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_301c3038f7d91b627c8b087aac8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "contact_types" ("type" character varying NOT NULL, "nameId" uuid NOT NULL, CONSTRAINT "REL_325340ec69c034fcb1a8ba7bef" UNIQUE ("nameId"), CONSTRAINT "PK_203b319266f9cf4e539cd0210ff" PRIMARY KEY ("type"))`
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nickname" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organizationId" uuid, "userId" uuid, "accessMode" character varying NOT NULL, "type" character varying NOT NULL, "value" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "organization_types" ("type" character varying NOT NULL, CONSTRAINT "PK_5940982ec542b3962df1f9b50c4" PRIMARY KEY ("type"))`
    );
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "status" character varying NOT NULL, "address" character varying NOT NULL DEFAULT '', "imagePath" character varying NOT NULL DEFAULT '', "settlementId" character varying NOT NULL, "createdBy" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "contact_accesses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contactId" uuid NOT NULL, "organizationId" uuid, "userId" uuid, "type" character varying NOT NULL, CONSTRAINT "PK_e0517a0527572d32155c6911dae" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_permissions" ("usersId" uuid NOT NULL, "permissionsId" uuid NOT NULL, CONSTRAINT "PK_95afc35336c4cf91726a781e12b" PRIMARY KEY ("usersId", "permissionsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_440db3d6dd15ea8bfb0af41703" ON "user_permissions" ("usersId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d68e45e4cd82c8fa4730e30cac" ON "user_permissions" ("permissionsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "dictionary_localizations" ADD CONSTRAINT "FK_334c0bb0ad7612dcaea086c817a" FOREIGN KEY ("language") REFERENCES "languages"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "dictionary_localizations" ADD CONSTRAINT "FK_b2c714045abd8f5fda84cdd5844" FOREIGN KEY ("phraseId") REFERENCES "dictionary_phrases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_types" ADD CONSTRAINT "FK_325340ec69c034fcb1a8ba7bef4" FOREIGN KEY ("nameId") REFERENCES "dictionary_phrases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_17e19c05cb1da4070f68f83c8e4" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_325cc53db170df8ded4fdf6709b" FOREIGN KEY ("type") REFERENCES "contact_types"("type") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD CONSTRAINT "FK_5a8e0c18328a68facab7f011327" FOREIGN KEY ("type") REFERENCES "organization_types"("type") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD CONSTRAINT "FK_1ed0e272bfdf49ab50e7b9a40c5" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_accesses" ADD CONSTRAINT "FK_e7b326af16ac69d5f5496b2a1f9" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_accesses" ADD CONSTRAINT "FK_11428d049460681e43942e66763" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_accesses" ADD CONSTRAINT "FK_9b905f2932056bba5b6edf7ddc0" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions" ADD CONSTRAINT "FK_440db3d6dd15ea8bfb0af417033" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions" ADD CONSTRAINT "FK_d68e45e4cd82c8fa4730e30cacd" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_permissions" DROP CONSTRAINT "FK_d68e45e4cd82c8fa4730e30cacd"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions" DROP CONSTRAINT "FK_440db3d6dd15ea8bfb0af417033"`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_accesses" DROP CONSTRAINT "FK_9b905f2932056bba5b6edf7ddc0"`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_accesses" DROP CONSTRAINT "FK_11428d049460681e43942e66763"`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_accesses" DROP CONSTRAINT "FK_e7b326af16ac69d5f5496b2a1f9"`
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" DROP CONSTRAINT "FK_1ed0e272bfdf49ab50e7b9a40c5"`
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" DROP CONSTRAINT "FK_5a8e0c18328a68facab7f011327"`
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_325cc53db170df8ded4fdf6709b"`
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_17e19c05cb1da4070f68f83c8e4"`
    );
    await queryRunner.query(
      `ALTER TABLE "contact_types" DROP CONSTRAINT "FK_325340ec69c034fcb1a8ba7bef4"`
    );
    await queryRunner.query(
      `ALTER TABLE "dictionary_localizations" DROP CONSTRAINT "FK_b2c714045abd8f5fda84cdd5844"`
    );
    await queryRunner.query(
      `ALTER TABLE "dictionary_localizations" DROP CONSTRAINT "FK_334c0bb0ad7612dcaea086c817a"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d68e45e4cd82c8fa4730e30cac"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_440db3d6dd15ea8bfb0af41703"`
    );
    await queryRunner.query(`DROP TABLE "user_permissions"`);
    await queryRunner.query(`DROP TABLE "contact_accesses"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
    await queryRunner.query(`DROP TABLE "organization_types"`);
    await queryRunner.query(`DROP TABLE "contacts"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "contact_types"`);
    await queryRunner.query(`DROP TABLE "dictionary_phrases"`);
    await queryRunner.query(`DROP INDEX "public"."idx_localizations_text"`);
    await queryRunner.query(`DROP TABLE "dictionary_localizations"`);
    await queryRunner.query(`DROP TABLE "languages"`);
  }
}
