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
exports.WorkPlanRepository = void 0;
const common_1 = require("@nestjs/common");
const work_plan_schema_1 = require("../schemas/work-plan.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let WorkPlanRepository = class WorkPlanRepository {
    constructor(_model) {
        this._model = _model;
        this.url = process.env.NOSQL_CONNECTION_STRING;
        this.dbName = process.env.DATABASE;
        this.collection = "workplan";
    }
    async findById(id) {
        return await this._model.findOne({ _id: id }).populate({
            path: 'product',
            populate: {
                path: 'items',
                model: 'Items'
            }
        });
    }
    async deleteById(id) {
        return await this._model.findByIdAndDelete({ _id: id });
    }
    async register(dto) {
        const data = new this._model(dto);
        return await data.save();
    }
    async findAll() {
        return await this._model.find().populate('product.items');
    }
    async update(id, dto) {
        return await this._model.findByIdAndUpdate({ _id: id }, { $set: Object.assign({}, dto) }, { new: true });
    }
    async listByIds(ids) {
        return await this._model.find({ _id: { $in: ids } }).populate('product.items');
    }
};
WorkPlanRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(work_plan_schema_1.WorkPlan.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WorkPlanRepository);
exports.WorkPlanRepository = WorkPlanRepository;
//# sourceMappingURL=work-plan.repository.js.map