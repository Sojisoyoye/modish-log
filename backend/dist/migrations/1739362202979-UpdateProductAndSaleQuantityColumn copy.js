"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductAndSaleQuantityColumn1739362202979 = void 0;
class UpdateProductAndSaleQuantityColumn1739362202979 {
    constructor() {
        this.name = 'UpdateProductAndSaleQuantityColumn1739362202979';
    }
    async up(queryRunner) {
        await queryRunner.query(`UPDATE "sale" SET "quantitySold" = 0 WHERE "quantitySold" IS NULL`);
        await queryRunner.query(`ALTER TABLE "sale" ALTER COLUMN "quantitySold" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sale" ALTER COLUMN "quantitySold" TYPE numeric(10,2)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sale" ALTER COLUMN "quantitySold" DROP NOT NULL`);
    }
}
exports.UpdateProductAndSaleQuantityColumn1739362202979 = UpdateProductAndSaleQuantityColumn1739362202979;
