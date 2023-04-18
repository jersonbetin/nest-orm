import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDataTimes1681775750968 implements MigrationInterface {
  name = 'addDataTimes1681775750968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createAt"`);
  }
}
