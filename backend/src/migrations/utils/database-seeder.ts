import { QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

/**
 * Database seeder utility class to help with adding seed data in migrations
 */
export class DatabaseSeeder {
  /**
   * Creates an admin user if it doesn't already exist
   */
  static async seedAdminUser(queryRunner: QueryRunner): Promise<void> {
    try {
      // Check if admin user already exists
      const existingAdmin = await queryRunner.query(
        `SELECT * FROM "user" WHERE username = 'admin'`
      );

      // Add admin user if it doesn't exist
      if (!existingAdmin.length) {
        // Generate hashed password for admin
        const saltRounds = 10;
        const adminPassword = "admin123";
        const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

        await queryRunner.query(
          `INSERT INTO "user" (username, password, role) 
           VALUES ('admin', '${hashedPassword}', 'admin')`
        );

        console.log("Admin user created successfully");
      } else {
        console.log("Admin user already exists");
      }
    } catch (error) {
      console.error("Error seeding admin user:", error);
      throw error;
    }
  }

  /**
   * Seeds sample products for development
   */
  static async seedProducts(queryRunner: QueryRunner): Promise<void> {
    try {
      // Check if we have existing products
      const existingProducts = await queryRunner.query(
        `SELECT COUNT(*) FROM "product"`
      );

      if (parseInt(existingProducts[0].count) === 0) {
        const products = [
          {
            color: "Akala",
            size: "0.5mm by 21mm",
            quantity: 100.0,
            price: 19.99,
          },
          { color: "Wenge", size: "1mm by 21mm", quantity: 50.0, price: 24.99 },
          { color: "Green", size: "1mm by 21mm", quantity: 75.0, price: 14.99 },
          {
            color: "Black",
            size: "0.5mm by 48mm",
            quantity: 30.0,
            price: 29.99,
          },
          { color: "White", size: "1mm by 21mm", quantity: 25.0, price: 34.99 },
        ];

        for (const product of products) {
          await queryRunner.query(
            `INSERT INTO "product" (color, size, quantity, price) 
             VALUES ('${product.color}', '${product.size}', ${product.quantity}, ${product.price})`
          );
        }
        console.log("Seed products created successfully");
      } else {
        console.log("Products already exist, skipping seed creation");
      }
    } catch (error) {
      console.error("Error seeding products:", error);
      throw error;
    }
  }

  /**
   * Seeds sample sales for development
   */
  static async seedSales(queryRunner: QueryRunner): Promise<void> {
    try {
      // Add sample sales if no sales exist
      const existingSales = await queryRunner.query(
        `SELECT COUNT(*) FROM "sale"`
      );

      if (parseInt(existingSales[0].count) === 0) {
        // Get product IDs for sales
        const productIds = await queryRunner.query(
          `SELECT id FROM "product" LIMIT 3`
        );

        if (productIds.length > 0) {
          const today = new Date();
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          const twoDaysAgo = new Date(today);
          twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

          // Format dates for PostgreSQL
          const formatDate = (date: Date) => {
            return date.toISOString();
          };

          // Sample sales data
          const sales = [
            {
              productId: productIds[0].id,
              quantitySold: 5.0,
              price: 19.99,
              saleDate: formatDate(today),
              paid: true,
              comment: "Paid in cash",
            },
            {
              productId: productIds[1].id,
              quantitySold: 3.0,
              price: 24.99,
              saleDate: formatDate(yesterday),
              paid: false,
              comment: "Customer will pay next week",
            },
            {
              productId: productIds[0].id,
              quantitySold: 2.0,
              price: 19.99,
              saleDate: formatDate(twoDaysAgo),
              paid: true,
              comment: "Bulk order",
            },
          ];

          for (const sale of sales) {
            await queryRunner.query(
              `INSERT INTO "sale" ("productId", "quantitySold", "price", "saleDate", "paid", "comment") 
               VALUES ('${sale.productId}', ${sale.quantitySold}, ${sale.price}, '${sale.saleDate}', ${sale.paid}, '${sale.comment}')`
            );
          }
          console.log("Sample sales created successfully");
        }
      } else {
        console.log("Sales already exist, skipping seed creation");
      }
    } catch (error) {
      console.error("Error seeding sales:", error);
      throw error;
    }
  }

  /**
   * Seeds sample stock counts for development
   */
  static async seedStockCounts(queryRunner: QueryRunner): Promise<void> {
    try {
      // Add sample stock count entries if none exist
      const existingStockCounts = await queryRunner.query(
        `SELECT COUNT(*) FROM "stock_count"`
      );

      if (parseInt(existingStockCounts[0].count) === 0) {
        // Get product IDs
        const productIds = await queryRunner.query(
          `SELECT id FROM "product" LIMIT 2`
        );

        if (productIds.length > 0) {
          const today = new Date();
          const formatDate = (date: Date) => date.toISOString();

          const stockCounts = [
            {
              productId: productIds[0].id,
              countedQuantity: 95,
              countDate: formatDate(today),
            },
            {
              productId: productIds[1].id,
              countedQuantity: 48,
              countDate: formatDate(today),
            },
          ];

          for (const count of stockCounts) {
            await queryRunner.query(
              `INSERT INTO "stock_count" ("productId", "countedQuantity", "countDate") 
               VALUES ('${count.productId}', ${count.countedQuantity}, '${count.countDate}')`
            );
          }
          console.log("Sample stock counts created successfully");
        }
      } else {
        console.log("Stock counts already exist, skipping seed creation");
      }
    } catch (error) {
      console.error("Error seeding stock counts:", error);
      throw error;
    }
  }

  /**
   * Seeds sample stock balance reports for development
   */
  static async seedStockBalanceReports(
    queryRunner: QueryRunner
  ): Promise<void> {
    try {
      // Add sample stock balance reports if none exist
      const existingReports = await queryRunner.query(
        `SELECT COUNT(*) FROM "stock_balance_report"`
      );

      if (parseInt(existingReports[0].count) === 0) {
        // Get product IDs
        const productIds = await queryRunner.query(
          `SELECT id FROM "product" LIMIT 2`
        );

        if (productIds.length > 0) {
          const today = new Date();
          const formatDate = (date: Date) => date.toISOString();

          const reports = [
            {
              productId: productIds[0].id,
              expectedQuantity: 100,
              actualQuantity: 95,
              difference: -5,
              reportDate: formatDate(today),
            },
            {
              productId: productIds[1].id,
              expectedQuantity: 50,
              actualQuantity: 48,
              difference: -2,
              reportDate: formatDate(today),
            },
          ];

          for (const report of reports) {
            await queryRunner.query(
              `INSERT INTO "stock_balance_report" ("productId", "expectedQuantity", "actualQuantity", "difference", "reportDate") 
               VALUES ('${report.productId}', ${report.expectedQuantity}, ${report.actualQuantity}, ${report.difference}, '${report.reportDate}')`
            );
          }
          console.log("Sample stock balance reports created successfully");
        }
      } else {
        console.log(
          "Stock balance reports already exist, skipping seed creation"
        );
      }
    } catch (error) {
      console.error("Error seeding stock balance reports:", error);
      throw error;
    }
  }
}
