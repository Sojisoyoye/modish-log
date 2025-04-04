"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductQuantityColumn1739362203645 = void 0;
class UpdateProductQuantityColumn1739362203645 {
    constructor() {
        this.name = 'UpdateProductQuantityColumn1739362203645';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "quantity" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "quantity" TYPE numeric(10,2)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "quantity" DROP NOT NULL`);
    }
}
exports.UpdateProductQuantityColumn1739362203645 = UpdateProductQuantityColumn1739362203645;
