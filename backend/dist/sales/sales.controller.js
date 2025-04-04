"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const sales_service_1 = require("./sales.service");
const dto_1 = require("./dto/dto");
let SalesController = class SalesController {
    constructor(salesService) {
        this.salesService = salesService;
    }
    async createSale(createSaleDto) {
        return this.salesService.createSale(createSaleDto);
    }
    async findAll() {
        return this.salesService.findAll();
    }
    async findOne(id) {
        const sale = await this.salesService.findOne(id);
        return sale;
    }
    async updateSale(id, updateSaleDto) {
        const sale = await this.salesService.updateSale(id, updateSaleDto);
        if (!sale) {
            throw new common_1.NotFoundException("Sale not found");
        }
        return sale;
    }
    async deleteSale(id) {
        const result = await this.salesService.deleteSale(id);
        if (!result) {
            throw new common_1.NotFoundException("Sale not found");
        }
        return { message: "Sale deleted successfully" };
    }
};
exports.SalesController = SalesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateSaleDto]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "createSale", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateSaleDto]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "updateSale", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "deleteSale", null);
exports.SalesController = SalesController = __decorate([
    (0, common_1.Controller)("api/sales"),
    __metadata("design:paramtypes", [sales_service_1.SalesService])
], SalesController);
