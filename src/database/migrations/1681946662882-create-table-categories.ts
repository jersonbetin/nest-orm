import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableCategories1681946662882 implements MigrationInterface {
  name = 'createTableCategories1681946662882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category_product" ("productId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_8867a8c065fd74640684cc371c7" PRIMARY KEY ("productId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a113e157b004ff4f917a13587" ON "category_product" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a819df7fe25ca5739eb10f5017" ON "category_product" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "category_product" ADD CONSTRAINT "FK_2a113e157b004ff4f917a13587d" FOREIGN KEY ("productId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_product" ADD CONSTRAINT "FK_a819df7fe25ca5739eb10f50177" FOREIGN KEY ("categoryId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category_product" DROP CONSTRAINT "FK_a819df7fe25ca5739eb10f50177"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_product" DROP CONSTRAINT "FK_2a113e157b004ff4f917a13587d"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_a819df7fe25ca5739eb10f5017"`);
    await queryRunner.query(`DROP INDEX "IDX_2a113e157b004ff4f917a13587"`);
    await queryRunner.query(`DROP TABLE "category_product"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
