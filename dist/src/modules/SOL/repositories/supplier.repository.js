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
exports.SupplierRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const supplier_schema_1 = require("../schemas/supplier.schema");
let SupplierRepository = class SupplierRepository {
    constructor(_model) {
        this._model = _model;
    }
    async register(dto) {
        const data = await new this._model(dto);
        return data.save();
    }
    async list() {
        const data = await this._model.find().populate('categories');
        return data;
    }
    async listById(_id) {
        const data = await this._model.findOne({ _id }).populate('categories');
        return data;
    }
    async updateNotifications(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $push: {
                notification_list: dto
            }
        });
    }
    async findByIdAndUpdate(_id, dto) {
        const data = await this._model.findByIdAndUpdate({ _id }, { $set: dto }, { new: true });
        return data;
    }
    async findByIdAndUpdateStatus(_id, dto) {
        const data = await this._model.findByIdAndUpdate({ _id }, {
            $set: {
                blocked: dto.blocked,
                blocked_reason: dto.blocked_reason,
            }
        }, { new: true });
        return data;
    }
    async findByIdAndAddGroup(_id, dto) {
        const data = await this._model.findByIdAndUpdate({ _id }, {
            $push: {
                group_id: dto.group_id,
            }
        }, { new: true });
        return data;
    }
    async findByIdAndRemoveGroup(_id, dto) {
        const data = await this._model.findByIdAndUpdate({ _id }, {
            $pull: {
                group_id: dto.group_id,
            }
        }, { new: true });
        return data;
    }
    async deleteById(_id) {
        return await this._model.findOneAndDelete({ _id });
    }
    async block(supplierId, dto) {
        const data = await this._model.findByIdAndUpdate({ _id: supplierId }, {
            $set: {
                blocked: true,
                blocked_reason: dto.blocked_reason
            }
        }, { new: true });
        return data;
    }
    async unblock(supplierId, dto) {
        const data = await this._model.findByIdAndUpdate({ _id: supplierId }, {
            $set: {
                blocked: false,
                blocked_reason: dto.blocked_reason
            }
        }, { new: true });
        return data;
    }
};
SupplierRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(supplier_schema_1.Supplier.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SupplierRepository);
exports.SupplierRepository = SupplierRepository;
//# sourceMappingURL=supplier.repository.js.map