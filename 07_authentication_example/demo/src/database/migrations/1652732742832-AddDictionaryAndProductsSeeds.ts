import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDictionaryAndProductsSeeds1652732742832
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories = [
      {
        name: 'meals',
        description: 'meals product category',
        localizations: [
          { language: 'uk', text: 'Продукти харчування' },
          { language: 'ru', text: 'Продукты питания' },
        ],
      },
      {
        name: 'medicals',
        description: 'medicals product category',
        localizations: [
          { language: 'ru', text: 'Медицинские средства' },
          { language: 'uk', text: 'Медичні засоби' },
        ],
      },
      {
        name: 'drinkable water',
        description: 'drinkable water product category',
        localizations: [
          { language: 'ru', text: 'Питьевая вода' },
          { language: 'uk', text: 'Питна вода' },
        ],
      },
      {
        name: 'clothes',
        description: 'clothes product category',
        localizations: [
          { language: 'ru', text: 'Одежда' },
          { language: 'uk', text: 'Одяг' },
        ],
      },
      {
        name: 'sanitary and hygienic tools',
        description: 'sanitary and hygienic tools product category',
        localizations: [
          { language: 'ru', text: 'Санитарные и гигиенические средства' },
          { language: 'uk', text: 'Санітарні та гігієнічні засоби' },
        ],
      },
      {
        name: 'other',
        description: 'other product category',
        localizations: [
          { language: 'ru', text: 'Другое' },
          { language: 'uk', text: 'Інше' },
        ],
      },
    ];

    await queryRunner.query(
      `INSERT INTO languages (code, name) VALUES
        ('uk', 'Українська'),
        ('ru', 'Русский');`,
    );

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const [phrase] = await queryRunner.query(
        `INSERT INTO dictionary_phrases (description) VALUES ($1) RETURNING id;`,
        [category.description],
      );
      for (let j = 0; j < category.localizations.length; j++) {
        const localization = category.localizations[j];
        await queryRunner.query(
          `INSERT INTO dictionary_localizations ("phraseId", "language", "text") VALUES ($1, $2, $3)`,
          [phrase.id, localization.language, localization.text],
        );
      }

      await queryRunner.query(
        `INSERT INTO product_categories ("category", "nameId") VALUES ($1, $2)`,
        [category.name, phrase.id],
      );
    }
  }

  public async down(): Promise<void> {
    //
  }
}
