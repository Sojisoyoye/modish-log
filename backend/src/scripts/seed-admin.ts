import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();

async function seedAdmin() {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error("ADMIN_PASSWORD environment variable is not set");
    }

    await AppDataSource.initialize();
    console.log("Database connection initialized");

    const adminUser = await AppDataSource.query(
      `SELECT * FROM "user" WHERE username = 'admin'`
    );

    if (adminUser.length === 0) {
      console.log("Admin user not found. Creating new admin user...");
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await AppDataSource.query(
        `INSERT INTO "user" (username, password, role) VALUES ('admin', $1, 'Admin')`,
        [hashedPassword]
      );
      console.log("Admin user created successfully");
    } else {
      console.log("Found existing admin user. Updating password...");
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await AppDataSource.query(
        `UPDATE "user" SET password = $1 WHERE username = 'admin'`,
        [hashedPassword]
      );
      console.log("Admin user password updated successfully");
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

seedAdmin();
