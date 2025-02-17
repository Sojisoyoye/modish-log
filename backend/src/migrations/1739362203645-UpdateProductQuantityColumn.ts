import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductQuantityColumn1739362203645 implements MigrationInterface {
    name = 'UpdateProductQuantityColumn1739362203645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "quantity" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "quantity" TYPE numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "quantity" DROP NOT NULL`);
    }

}
