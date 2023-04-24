import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeLimitBranchName1682358169413 implements MigrationInterface {
  name = 'ChangeLimitBranchName1682358169413';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "image" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "brand_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_75895eeb1903f8a17816dafe0a" ON "products" ("price") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4fbc36ad745962e5c11001e1a8" ON "products" ("price", "stock") `,
    );
    await queryRunner.query(
      `CREATE TABLE "brands" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "nickname" character varying(255) DEFAULT '', "image" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "costumer_id" integer, CONSTRAINT "REL_2bd249e90b3f22eb629d07afd2" UNIQUE ("costumer_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders_products" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "product_id" integer, "order_id" integer, CONSTRAINT "PK_4945c6758fd65ffacda760b4ac9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "phone" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "completed" boolean NOT NULL DEFAULT false, "inCompleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories_products" ("category_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_99a8246a1c03587ec10bd93836b" PRIMARY KEY ("category_id", "product_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_18751735d6d4936849dafa4d75" ON "categories_products" ("category_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cd4647bd19e92294b58a536798" ON "categories_products" ("product_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_2bd249e90b3f22eb629d07afd2f" FOREIGN KEY ("costumer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" ADD CONSTRAINT "FK_beb618ce6dae64b9d817394ebdb" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" ADD CONSTRAINT "FK_266b0df20b9e4423bc9da1bbdc1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_products" ADD CONSTRAINT "FK_18751735d6d4936849dafa4d751" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_products" ADD CONSTRAINT "FK_cd4647bd19e92294b58a536798c" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories_products" DROP CONSTRAINT "FK_cd4647bd19e92294b58a536798c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_products" DROP CONSTRAINT "FK_18751735d6d4936849dafa4d751"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP CONSTRAINT "FK_266b0df20b9e4423bc9da1bbdc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP CONSTRAINT "FK_beb618ce6dae64b9d817394ebdb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_2bd249e90b3f22eb629d07afd2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cd4647bd19e92294b58a536798"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_18751735d6d4936849dafa4d75"`,
    );
    await queryRunner.query(`DROP TABLE "categories_products"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "orders_products"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "brands"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4fbc36ad745962e5c11001e1a8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_75895eeb1903f8a17816dafe0a"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
