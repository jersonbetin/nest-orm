import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColumnNickname1682358665709 implements MigrationInterface {
    name = 'RemoveColumnNickname1682358665709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "nickname"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" ADD "nickname" character varying(255) DEFAULT ''`);
    }

}
