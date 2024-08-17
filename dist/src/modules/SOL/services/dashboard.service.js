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
var DashboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const bid_repository_1 = require("../repositories/bid.repository");
const supplier_repository_1 = require("../repositories/supplier.repository");
const association_repository_1 = require("../repositories/association.repository");
const dashboard_response_dto_1 = require("../dtos/dashboard-response.dto");
let DashboardService = DashboardService_1 = class DashboardService {
    constructor(_bidRepository, _supplierRepository, _associationRepository) {
        this._bidRepository = _bidRepository;
        this._supplierRepository = _supplierRepository;
        this._associationRepository = _associationRepository;
        this._logger = new common_1.Logger(DashboardService_1.name);
    }
    async getData() {
        const bid = await this._bidRepository.listForDashboard();
        const supplier = await this._supplierRepository.list();
        const association = await this._associationRepository.list();
        return new dashboard_response_dto_1.DashboardResponseDto(bid.length, association.length, supplier.length);
    }
};
DashboardService = DashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bid_repository_1.BidRepository,
        supplier_repository_1.SupplierRepository,
        association_repository_1.AssociationRepository])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map