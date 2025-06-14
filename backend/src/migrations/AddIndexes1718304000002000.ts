import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexes1718304000002000 implements MigrationInterface {
  name = "AddIndexes1718304000002000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add index on productId in sale table for faster joining
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_sale_productId" ON "sale" ("productId")
    `);

    // Add index on saleDate for date range queries
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_sale_saleDate" ON "sale" ("saleDate")
    `);

    // Add index on productId in stock_count table
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_stockcount_productId" ON "stock_count" ("productId")
    `);

    // Add index on countDate for filtering by date
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_stockcount_countDate" ON "stock_count" ("countDate")
    `);

    // Add index on productId in stock_balance_report table
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_stockbalance_productId" ON "stock_balance_report" ("productId")
    `);

    // Add index on reportDate for filtering by date
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_stockbalance_reportDate" ON "stock_balance_report" ("reportDate")
    `);

    // Add index on role in user table for role-based filtering
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_user_role" ON "user" ("role")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove all indexes created in up method
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_sale_productId"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_sale_saleDate"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_stockcount_productId"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_stockcount_countDate"`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_stockbalance_productId"`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_stockbalance_reportDate"`
    );
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_role"`);
  }
}
