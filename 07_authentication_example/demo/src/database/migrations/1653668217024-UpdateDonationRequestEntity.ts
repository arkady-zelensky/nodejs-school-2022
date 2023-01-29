import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDonationRequestEntity1653668217024
  implements MigrationInterface
{
  name = 'UpdateDonationRequestEntity1653668217024';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "donation_requests" ADD "statusText" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "donation_requests" DROP COLUMN "statusText"`,
    );
  }
}
