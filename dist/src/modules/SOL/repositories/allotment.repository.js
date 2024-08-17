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
exports.AllotmentRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const allotment_schema_1 = require("../schemas/allotment.schema");
let AllotmentRepository = class AllotmentRepository {
    constructor(_model) {
        this._model = _model;
    }
    async register(dto) {
        const data = await new this._model(dto);
        return data.save();
    }
    async list() {
        const list = await this._model.find();
        return list;
    }
    async listById(_id) {
        const list = await this._model.findOne({ _id });
        return list;
    }
    async listByIds(_ids) {
        const list = await this._model.find({ _id: { $in: _ids } });
        return list;
    }
    async update(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: { dto },
        }, { new: true });
    }
    async editUpdate(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: { allotment_name: dto.allotment_name },
        }, { new: true });
    }
    async updateStauts(_id, status) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: { status },
        });
    }
    async addProposal(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: { proposals: dto },
        }, { new: true });
    }
    async updateProposal(_id, dto) {
        const item = await this._model.findOneAndUpdate({ _id }, {
            $push: {
                proposals: dto,
            },
        }, { new: true });
        return item;
    }
    async updateItem(_id, dto) {
        const item = await this._model.findOneAndUpdate({ _id }, {
            $push: {
                add_item: dto,
            },
        }, { new: true });
        return item;
    }
    async removeProposal(_id) {
        return await this._model.findOneAndUpdate({ _id, proposals: { $exists: true } }, {
            $set: { proposals: [] },
        }, { new: true });
    }
    async updateStatusByIds(_ids, status) {
        return await this._model.updateMany({ _id: { $in: _ids } }, { $set: { status } });
    }
};
AllotmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(allotment_schema_1.Allotment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AllotmentRepository);
exports.AllotmentRepository = AllotmentRepository;
//# sourceMappingURL=allotment.repository.js.map