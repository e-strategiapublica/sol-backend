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
var CostItemsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostItemsService = void 0;
const common_1 = require("@nestjs/common");
const cost_items_repository_1 = require("../repositories/cost-items.repository");
const category_repository_1 = require("../repositories/category.repository");
const product_repository_1 = require("../repositories/product.repository");
const agreement_repository_1 = require("../repositories/agreement.repository");
const items_model_1 = require("../models/database/items.model");
let CostItemsService = CostItemsService_1 = class CostItemsService {
    constructor(_constItemsRepository, _categoryRepository, _productRepository, _agremmentRepository, itemsModel) {
        this._constItemsRepository = _constItemsRepository;
        this._categoryRepository = _categoryRepository;
        this._productRepository = _productRepository;
        this._agremmentRepository = _agremmentRepository;
        this.itemsModel = itemsModel;
        this._logger = new common_1.Logger(CostItemsService_1.name);
    }
    async register(dto) {
        const category = await this._categoryRepository.getById(dto.categoryId);
        if (!category) {
            throw new common_1.BadRequestException("Categoria não encontrada!");
        }
        dto.category = category;
        const product = await this._productRepository.getById(dto.productId);
        if (!product) {
            throw new common_1.BadRequestException("Produto não encontrado!");
        }
        dto.product = product;
        const result = await this._constItemsRepository.register(dto);
        return result;
    }
    async list() {
        const result = await this._constItemsRepository.list();
        return result;
    }
    async listByIds(ids) {
        const result = await this._constItemsRepository.listByIds(ids);
        return result;
    }
    async getById(_id) {
        const result = await this._constItemsRepository.getById(_id);
        if (!result) {
            throw new common_1.BadRequestException("Item não encontrado!");
        }
        return result;
    }
    async getByProjectManagerId(_id) {
        const agreement = await this._agremmentRepository.findAgreementByManagerId(_id);
        const itens = [];
        for (let i = 0; i < agreement.length; i++) {
            if (agreement[i].workPlan.length > 0) {
                for (let j = 0; j < agreement[i].workPlan.length; j++) {
                    itens.push(await this._constItemsRepository.getById(agreement[i].workPlan[j].product[0].items._id.toString()));
                }
            }
        }
        return itens;
    }
    async update(_id, dto) {
        dto.product = await this._productRepository.getById(dto.productId);
        dto.category = await this._categoryRepository.getById(dto.categoryId);
        const result = await this._constItemsRepository.update(_id, dto);
        if (!result) {
            throw new common_1.BadRequestException("Item não encontrado!");
        }
        return result;
    }
    async deleteById(_id) {
        return await this._constItemsRepository.deleteById(_id);
    }
    async handlerJob(data) {
        const costItemsAll = await this.itemsModel.list();
        const now = new Date();
        for (let item of data) {
            const result = await this.itemsModel.saveItem({
                group: {
                    _id: costItemsAll[0].group._id,
                    category_name: costItemsAll[0].group.category_name,
                    code: costItemsAll[0].group.code,
                    segment: costItemsAll[0].group.segment
                },
                class: {
                    _id: costItemsAll[0].class._id,
                    code: costItemsAll[0].class.code,
                    description: costItemsAll[0].class.description
                },
                pdm: {
                    _id: costItemsAll[0].pdm._id,
                    code: costItemsAll[0].pdm.code,
                    name: costItemsAll[0].pdm.name,
                    unitList: [item.unit]
                },
                code: item.id,
                name: item.title,
                propertyListValue: [
                    { property: 'Generic', value: item.quantity }
                ]
            });
        }
    }
    async getByName(name) {
        const result = await this._constItemsRepository.getByName(name);
        return result;
    }
};
CostItemsService = CostItemsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cost_items_repository_1.CostItemsRepository,
        category_repository_1.CategoryRepository,
        product_repository_1.ProductRepository,
        agreement_repository_1.AgreementRepository,
        items_model_1.ItemsModel])
], CostItemsService);
exports.CostItemsService = CostItemsService;
//# sourceMappingURL=cost-items.service.js.map