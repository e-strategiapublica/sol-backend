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
exports.AgreementRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const agreement_schema_1 = require("../schemas/agreement.schema");
const agreement_active_status_1 = require("../enums/agreement-active-status");
let AgreementRepository = class AgreementRepository {
    constructor(_model) {
        this._model = _model;
    }
    async findById(id) {
        return (await this._model.findOne({ _id: id }).populate("workPlan").populate("association").populate("manager").populate("project").populate("reviewer"));
    }
    async findAgreementByReviewerOrManagerId(_id) {
        return await this._model.find({
            $or: [{ manager: _id }, { reviewer: _id }]
        });
    }
    async findAgreementByReviewerId(_id) {
        return await this._model.find({
            reviewer: _id
        });
    }
    async findAgreementByManagerId(_id) {
        return await this._model.find({
            manager: _id
        }).populate("workPlan");
    }
    async findAgreementByProjectId(_id) {
        return await this._model.findOne({
            project: _id
        }).populate("workPlan");
    }
    async deleteById(id) {
        return await this._model.findOneAndUpdate({ _id: id }, { $set: { activeStatus: agreement_active_status_1.AgreementActiveStatusEnum.inactive } });
    }
    async register(dto) {
        const data = new this._model(dto);
        return await data.save();
    }
    async findAll() {
        return await this._model
            .find({ activeStatus: agreement_active_status_1.AgreementActiveStatusEnum.active })
            .populate("association")
            .populate("reviewer")
            .populate({
            path: "workPlan",
            populate: {
                path: "product",
                populate: {
                    path: "items"
                },
            },
        })
            .populate("manager");
    }
    async findAgreementsWithOutProject(array) {
        return await this._model
            .find({ _id: { $nin: array } });
    }
    async findAgreementsWithProject(array) {
        return await this._model
            .find({
            _id: { $in: array },
            activeStatus: agreement_active_status_1.AgreementActiveStatusEnum.active
        })
            .populate("association")
            .populate("manager")
            .populate("reviewer")
            .populate({
            path: "workPlan",
            populate: {
                path: "product",
                populate: {
                    path: "items",
                },
            },
        });
    }
    async findForAssociation(associationId) {
        return await this._model
            .find({ association: { _id: associationId },
            activeStatus: agreement_active_status_1.AgreementActiveStatusEnum.active })
            .populate("association")
            .populate("manager")
            .populate("reviewer")
            .populate({
            path: "workPlan",
            populate: {
                path: "product",
                populate: {
                    path: "items",
                },
            },
        });
    }
    async findForGerenteGeralProjetos(projectManagerId) {
        return await this._model
            .find({
            manager: { _id: projectManagerId },
            activeStatus: agreement_active_status_1.AgreementActiveStatusEnum.active
        })
            .populate("association")
            .populate("manager")
            .populate("reviewer")
            .populate({
            path: "workPlan",
            populate: {
                path: "product",
                populate: {
                    path: "items",
                },
            },
        });
    }
    async findForReviewer(reviewerId) {
        return await this._model
            .find({
            reviewer: { _id: reviewerId },
            activeStatus: agreement_active_status_1.AgreementActiveStatusEnum.active
        })
            .populate("association")
            .populate("manager")
            .populate("reviewer")
            .populate({
            path: "workPlan",
            populate: {
                path: "product",
                populate: {
                    path: "items",
                },
            },
        });
    }
    async findByProjectId(projectId) {
        return await this._model
            .find({ project: { _id: projectId } })
            .populate("association")
            .populate("project")
            .populate("manager")
            .populate("reviewer")
            .populate({
            path: "workPlan",
            populate: {
                path: "product",
                populate: {
                    path: "items",
                },
            },
        });
    }
    async addManager(id, dto) {
        return await this._model.findByIdAndUpdate({ _id: id }, {
            $set: {
                manager: dto
            },
        }, { new: true });
    }
    async update(id, dto) {
        return await this._model.findByIdAndUpdate({ _id: id }, {
            $set: Object.assign({}, dto),
        }, { new: true });
    }
};
AgreementRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(agreement_schema_1.Agreement.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AgreementRepository);
exports.AgreementRepository = AgreementRepository;
//# sourceMappingURL=agreement.repository.js.map