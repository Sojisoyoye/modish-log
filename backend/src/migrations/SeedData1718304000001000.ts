import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseSeeder } from "./utils/database-seeder";

export class SeedData1718304000001000 implements MigrationInterface {
  name = "SeedData1718304000001000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      console.log("Starting database seeding...");

      // Seed admin user
      await DatabaseSeeder.seedAdminUser(queryRunner);

      // Seed products
      await DatabaseSeeder.seedProducts(queryRunner);

      // Seed sales data
      await DatabaseSeeder.seedSales(queryRunner);

      // Seed stock counts
      await DatabaseSeeder.seedStockCounts(queryRunner);

      // Seed stock balance reports
      await DatabaseSeeder.seedStockBalanceReports(queryRunner);

      console.log("Database seeding completed successfully!");
    } catch (error) {
      console.error("Error during database seeding:", error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      console.log("Removing seed data...");

      // Delete seed data in reverse order (to avoid foreign key constraints)
      await queryRunner.query(`DELETE FROM "stock_balance_report"`);
      console.log("Removed stock balance reports");

      await queryRunner.query(`DELETE FROM "stock_count"`);
      console.log("Removed stock counts");

      await queryRunner.query(`DELETE FROM "sale"`);
      console.log("Removed sales");

      await queryRunner.query(`DELETE FROM "product"`);
      console.log("Removed products");

      await queryRunner.query(`DELETE FROM "user" WHERE username = 'admin'`);
      console.log("Removed admin user");

      console.log("Successfully removed all seed data");
    } catch (error) {
      console.error("Error removing seed data:", error);
      throw error;
    }
  }
}
