import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductAndSaleQuantityColumn1739362202979 implements MigrationInterface {
    name = 'UpdateProductAndSaleQuantityColumn1739362202979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "sale" SET "quantitySold" = 0 WHERE "quantitySold" IS NULL`);
        await queryRunner.query(`ALTER TABLE "sale" ALTER COLUMN "quantitySold" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sale" ALTER COLUMN "quantitySold" TYPE numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale" ALTER COLUMN "quantitySold" DROP NOT NULL`);
    }

}
