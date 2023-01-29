import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductsAndTranslations1652731514365
  implements MigrationInterface
{
  name = 'AddProductsAndTranslations1652731514365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "languages" ("code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7397752718d1c9eb873722ec9b2" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dictionary_localizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "language" character varying NOT NULL, "phraseId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89399f3e700ba602430ac9f644b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dictionary_phrases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_301c3038f7d91b627c8b087aac8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" character varying NOT NULL, "nameId" uuid NOT NULL, CONSTRAINT "REL_d9cc8041d72436fe0656523e4e" UNIQUE ("nameId"), CONSTRAINT "PK_7069dac60d88408eca56fdc9e0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nameId" uuid NOT NULL, "categoryId" uuid NOT NULL, "imagePath" character varying NOT NULL DEFAULT '', "status" character varying NOT NULL, "createdBy" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_cddfc8b9b2742b4d3197c0137d" UNIQUE ("nameId"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "dictionary_localizations" ADD CONSTRAINT "FK_334c0bb0ad7612dcaea086c817a" FOREIGN KEY ("language") REFERENCES "languages"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "dictionary_localizations" ADD CONSTRAINT "FK_b2c714045abd8f5fda84cdd5844" FOREIGN KEY ("phraseId") REFERENCES "dictionary_phrases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories" ADD CONSTRAINT "FK_d9cc8041d72436fe0656523e4e0" FOREIGN KEY ("nameId") REFERENCES "dictionary_phrases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_cddfc8b9b2742b4d3197c0137db" FOREIGN KEY ("nameId") REFERENCES "dictionary_phrases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "product_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE INDEX idx_localizations_text ON dictionary_localizations USING gist ("text" gist_trgm_ops);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_cddfc8b9b2742b4d3197c0137db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories" DROP CONSTRAINT "FK_d9cc8041d72436fe0656523e4e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dictionary_localizations" DROP CONSTRAINT "FK_b2c714045abd8f5fda84cdd5844"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dictionary_localizations" DROP CONSTRAINT "FK_334c0bb0ad7612dcaea086c817a"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "product_categories"`);
    await queryRunner.query(`DROP TABLE "dictionary_phrases"`);
    await queryRunner.query(`DROP INDEX "public"."idx_localizations_text"`);
    await queryRunner.query(`DROP TABLE "dictionary_localizations"`);
    await queryRunner.query(`DROP TABLE "languages"`);
  }
}
