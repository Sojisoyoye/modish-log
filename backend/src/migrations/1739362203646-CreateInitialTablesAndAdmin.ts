import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTablesAndAdmin1739362203646
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "username" VARCHAR NOT NULL UNIQUE,
                "password" VARCHAR NOT NULL,
                "role" VARCHAR NOT NULL
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "product" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "color" VARCHAR NOT NULL,
                "size" VARCHAR NOT NULL,
                "quantity" DECIMAL(4,1) NOT NULL,
                "price" DECIMAL(10,2) NOT NULL
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "sale" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "productId" UUID REFERENCES "product"("id"),
                "quantitySold" DECIMAL(4,1) NOT NULL,
                "price" DECIMAL(10,2) NOT NULL,
                "saleDate" TIMESTAMP NOT NULL DEFAULT now(),
                "paid" BOOLEAN NOT NULL DEFAULT false,
                "comment" TEXT
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "stock_count" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "productId" UUID REFERENCES "product"("id"),
                "countedQuantity" DECIMAL(4,1) NOT NULL,
                "countDate" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "stock_balance_report" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "productId" UUID REFERENCES "product"("id"),
                "expectedQuantity" DECIMAL(4,1) NOT NULL,
                "actualQuantity" DECIMAL(4,1) NOT NULL,
                "difference" DECIMAL(4,1) NOT NULL,
                "reportDate" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

    await queryRunner.query(`
            INSERT INTO "user" (username, password, role)
            VALUES (
                'admin',
                '$2b$10$8K1p/a7ZqXxXxXxXxXxXxO5XxXxXxXxXxXxXxXxXxXxXxXxXxXx',
                'Admin'
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "stock_balance_report"`);
    await queryRunner.query(`DROP TABLE "stock_count"`);
    await queryRunner.query(`DROP TABLE "sale"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
