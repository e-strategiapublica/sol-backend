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
exports.ProjectRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const agreement_active_status_1 = require("../enums/agreement-active-status");
const project_schema_1 = require("../schemas/project.schema");
let ProjectRepository = class ProjectRepository {
    constructor(_model) {
        this._model = _model;
    }
    async findById(id) {
        return (await (await this._model.findOne({ _id: id }).populate("project_manager").populate("viewer_list")).populate('reviewer_list'));
    }
    async findByEmail(email) {
        return (await (await this._model.findOne({ email: email }).populate("project_manager").populate("viewer_list")).populate('reviewer_list'));
    }
    async deleteById(id) {
        return await this._model.findOneAndUpdate({ _id: id }, { $set: { activeStatus: agreement_active_status_1.AgreementActiveStatusEnum.inactive } });
    }
    async trueDelete(id) {
        return await this._model.findByIdAndDelete({ _id: id });
    }
    async register(dto) {
        const data = new this._model(dto);
        return await data.save();
    }
    async findAllProjectsByReviewerId(reviewerId) {
        return await this._model
            .find({ reviewer_list: reviewerId, activeStatus: agreement_active_status_1.AgreementActiveStatusEnum.active })
            .populate("project_manager");
    }
    async findAllProjectsByViewerId(reviewerId) {
        return await this._model
            .find({ $or: [{ viewer_list: reviewerId }, { project_manager: reviewerId }, { reviewer_list: reviewerId }], activeStatus: agreement_active_status_1.AgreementActiveStatusEnum.active })
            .populate("project_manager");
    }
    async findAllProjectsByManagerId(reviewerId) {
        return await this._model
            .find({ project_manager: reviewerId, activeStatus: agreement_active_status_1.AgreementActiveStatusEnum.active })
            .populate("project_manager");
    }
    async findAll() {
        return await this._model
            .find({ activeStatus: agreement_active_status_1.AgreementActiveStatusEnum.active })
            .populate("project_manager");
    }
};
ProjectRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectRepository);
exports.ProjectRepository = ProjectRepository;
//# sourceMappingURL=project.repository.js.map