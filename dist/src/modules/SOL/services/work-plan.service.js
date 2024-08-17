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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkPlanService = void 0;
const common_1 = require("@nestjs/common");
const work_plan_repository_1 = require("../repositories/work-plan.repository");
const cost_items_service_1 = require("./cost-items.service");
const items_model_1 = require("../models/database/items.model");
const mongodb_1 = require("mongodb");
let WorkPlanService = class WorkPlanService {
    constructor(_workPlanRepository, _costItemsService, _itemsModel) {
        this._workPlanRepository = _workPlanRepository;
        this._costItemsService = _costItemsService;
        this._itemsModel = _itemsModel;
    }
    async findById(id) {
        return await this._workPlanRepository.findById(id);
    }
    async deleteById(id) {
        return await this._workPlanRepository.deleteById(id);
    }
    async register(dto) {
        let itemArray = [];
        for (let i = 0; i < dto.product.length; i++) {
            itemArray.push({ "_id": new mongodb_1.ObjectId(dto.product[i].items) });
        }
        const costItems = await this._itemsModel.listByIds(itemArray);
        for (let i = 0; i < dto.product.length; i++) {
            const item = costItems.find(item => item._id.toString() === dto.product[i].items);
            dto.product[i].items = item;
        }
        const result = await this._workPlanRepository.register(dto);
        return result;
    }
    async registerFromIntegration(dto) {
        const costItems = await this._costItemsService.listByIds(dto.product.map(item => item.items));
        for (let i = 0; i < dto.product.length; i++) {
            const item = costItems.find(item => item._id.toString() === dto.product[i].items);
            dto.product[i].items = item;
        }
        const result = await this._workPlanRepository.register(dto);
        return result;
    }
    async findAll() {
        const result = await this._workPlanRepository.findAll();
        return result;
    }
    async listByIds(ids) {
        const result = await this._workPlanRepository.listByIds(ids);
        return result;
    }
    async update(id, dto) {
        return await this._workPlanRepository.update(id, dto);
    }
};
WorkPlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [work_plan_repository_1.WorkPlanRepository,
        cost_items_service_1.CostItemsService,
        items_model_1.ItemsModel])
], WorkPlanService);
exports.WorkPlanService = WorkPlanService;
//# sourceMappingURL=work-plan.service.js.map