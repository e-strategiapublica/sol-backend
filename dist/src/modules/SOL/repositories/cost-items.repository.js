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
exports.CostItemsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const cost_items_schema_1 = require("../schemas/cost-items.schema");
let CostItemsRepository = class CostItemsRepository {
    constructor(_model) {
        this._model = _model;
    }
    async register(dto) {
        const data = await new this._model(dto);
        return data.save();
    }
    async list() {
        return await this._model.find()
            .populate('category')
            .populate('product');
    }
    async getById(_id) {
        return await this._model.findOne({ _id })
            .populate('category')
            .populate('product');
    }
    async update(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                code: dto.code,
                name: dto.name,
                phone: dto.name,
                unitMeasure: dto.unitMeasure,
                category: dto.category,
                product: dto.product,
                specification: dto.specification,
                product_relation: dto.product_relation
            }
        });
    }
    async deleteById(_id) {
        return await this._model.findOneAndDelete({ _id });
    }
    async listByIds(ids) {
        return await this._model.find({ _id: { $in: ids } })
            .populate('category')
            .populate('product');
    }
    async getByName(name) {
        return await this._model.findOne({ name: name })
            .populate('category')
            .populate('items');
    }
};
CostItemsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(cost_items_schema_1.CostItems.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CostItemsRepository);
exports.CostItemsRepository = CostItemsRepository;
//# sourceMappingURL=cost-items.repository.js.map