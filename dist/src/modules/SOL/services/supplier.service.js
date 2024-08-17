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
var SupplierService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierService = void 0;
const common_1 = require("@nestjs/common");
const supplier_repository_1 = require("../repositories/supplier.repository");
const category_repository_1 = require("../repositories/category.repository");
let SupplierService = SupplierService_1 = class SupplierService {
    constructor(_supplierRepository, _categoryRepository) {
        this._supplierRepository = _supplierRepository;
        this._categoryRepository = _categoryRepository;
        this._logger = new common_1.Logger(SupplierService_1.name);
    }
    async register(dto) {
        if (dto.categoriesId.length) {
            const categories = await this._categoryRepository.listByIds(dto.categoriesId);
            if (!categories.length)
                throw new common_1.BadRequestException('Categoria não encontrada!');
            dto.categories = categories;
        }
        dto.blocked = false;
        const result = await this._supplierRepository.register(dto);
        if (!result) {
            throw new common_1.BadRequestException('Não foi possivel cadastrar o fornecedor!');
        }
        return result;
    }
    async list() {
        const result = await this._supplierRepository.list();
        return result;
    }
    async listById(_id) {
        const result = await this._supplierRepository.listById(_id);
        if (!result) {
            throw new common_1.BadRequestException('Fornecedor não encontrado!');
        }
        return result;
    }
    async update(_id, dto) {
        const item = await this._supplierRepository.listById(_id);
        if (!item) {
            throw new common_1.BadRequestException('Fornecedor não encontrado!');
        }
        if (dto.categoriesId.length) {
            const categories = await this._categoryRepository.listByIds(dto.categoriesId);
            if (!categories.length)
                throw new common_1.BadRequestException('Categoria não encontrada!');
            dto.categories = categories;
        }
        const result = await this._supplierRepository.findByIdAndUpdate(_id, dto);
        return result;
    }
    async updateStatus(_id, dto) {
        const item = await this._supplierRepository.listById(_id);
        if (!item) {
            throw new common_1.BadRequestException('Fornecedor não encontrado!');
        }
        const result = await this._supplierRepository.findByIdAndUpdateStatus(_id, dto);
        return result;
    }
    async updateGroup(_id, dto) {
        if (!dto.group_id) {
            throw new common_1.BadRequestException('Informe a categoria e segmento.');
        }
        const item = await this._supplierRepository.listById(_id);
        const hasItem = item.group_id.find(ele => ele === dto.group_id);
        if (hasItem !== undefined) {
            if (item.group_id.find(ele => ele === dto.group_id).length === 0) {
                const result = await this._supplierRepository.findByIdAndAddGroup(_id, dto);
                return result;
            }
            else {
                const result = await this._supplierRepository.findByIdAndRemoveGroup(_id, dto);
                return result;
            }
        }
        else {
            const result = await this._supplierRepository.findByIdAndAddGroup(_id, dto);
            return result;
        }
    }
    async deleteById(_id) {
        return await this._supplierRepository.deleteById(_id);
    }
    async block(supplierId, dto) {
        return await this._supplierRepository.block(supplierId, dto);
    }
    async unblock(supplierId, dto) {
        return await this._supplierRepository.unblock(supplierId, dto);
    }
};
SupplierService = SupplierService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supplier_repository_1.SupplierRepository,
        category_repository_1.CategoryRepository])
], SupplierService);
exports.SupplierService = SupplierService;
//# sourceMappingURL=supplier.service.js.map