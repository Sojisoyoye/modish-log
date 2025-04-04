"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductPriceColumn1739203506404 = void 0;
class UpdateProductPriceColumn1739203506404 {
    constructor() {
        this.name = 'UpdateProductPriceColumn1739203506404';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" numeric(10,2) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" integer`);
    }
}
exports.UpdateProductPriceColumn1739203506404 = UpdateProductPriceColumn1739203506404;
