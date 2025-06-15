import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1718304000000000 implements MigrationInterface {
  name = 'InitialSchema1718304000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const saleTableExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'sale'
      );
    `);

    if (saleTableExists[0].exists) {
      await queryRunner.query(`
        ALTER TABLE sale
        DROP CONSTRAINT IF EXISTS "FK_a0a99bbb3f0ae6ecea2abc7393b";
      `);
    }

    const stockCountTableExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'stock_count'
      );
    `);

    if (stockCountTableExists[0].exists) {
      await queryRunner.query(`
        ALTER TABLE stock_count
        DROP CONSTRAINT IF EXISTS "FK_baf8540f10307eee0b63d7a1944";
      `);
    }

    const stockBalanceReportTableExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'stock_balance_report'
      );
    `);

    if (stockBalanceReportTableExists[0].exists) {
      await queryRunner.query(`
        ALTER TABLE stock_balance_report
        DROP CONSTRAINT IF EXISTS "FK_98787bf9ddde5ac731d38e93f46";
      `);
    }

    // Create UUID extension if not exists
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

 
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "username" character varying NOT NULL,
        "password" character varying NOT NULL,
        "role" character varying NOT NULL,
        CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )
    `);

  
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "product" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "color" character varying NOT NULL,
        "size" character varying NOT NULL,
        "quantity" numeric(4,1) NOT NULL,
        "price" numeric(10,2) NOT NULL,
        CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "sale" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "quantitySold" numeric(4,1) NOT NULL,
        "price" numeric(10,2) NOT NULL,
        "saleDate" TIMESTAMP NOT NULL,
        "paid" boolean NOT NULL DEFAULT false,
        "comment" text,
        "productId" uuid,
        CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "stock_count" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "countedQuantity" integer NOT NULL,
        "countDate" TIMESTAMP NOT NULL,
        "productId" uuid,
        CONSTRAINT "PK_a9a2e1e8587f747f79b591e0a01" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "stock_balance_report" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "expectedQuantity" integer NOT NULL,
        "actualQuantity" integer NOT NULL,
        "difference" integer NOT NULL,
        "reportDate" TIMESTAMP NOT NULL,
        "productId" uuid,
        CONSTRAINT "PK_b9ecf19312b1f40f9d8992e4f0f" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "sale" ADD CONSTRAINT "FK_a0a99bbb3f0ae6ecea2abc7393b" 
      FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "stock_count" ADD CONSTRAINT "FK_baf8540f10307eee0b63d7a1944" 
      FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "stock_balance_report" ADD CONSTRAINT "FK_98787bf9ddde5ac731d38e93f46" 
      FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stock_balance_report" DROP CONSTRAINT "FK_98787bf9ddde5ac731d38e93f46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_count" DROP CONSTRAINT "FK_baf8540f10307eee0b63d7a1944"`,
    );
    await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_a0a99bbb3f0ae6ecea2abc7393b"`);

    await queryRunner.query(`DROP TABLE "stock_balance_report"`);
    await queryRunner.query(`DROP TABLE "stock_count"`);
    await queryRunner.query(`DROP TABLE "sale"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
