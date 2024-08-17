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
exports.BidRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bids_schema_1 = require("../schemas/bids.schema");
const bid_status_enum_1 = require("../enums/bid-status.enum");
const agreement_repository_1 = require("./agreement.repository");
let BidRepository = class BidRepository {
    constructor(_model, _agreementRepository) {
        this._model = _model;
        this._agreementRepository = _agreementRepository;
    }
    async register(dto) {
        const data = await new this._model(dto);
        return data.save();
    }
    async getByAgreementId(_id) {
        return await this._model.find({ agreement: { _id } });
    }
    async getByReviewerId(_id) {
        const agreements = await this._agreementRepository.findForReviewer(_id);
        const agreementIds = agreements.map(agreement => agreement._id);
        return await this._model.find({ agreement: { $in: agreementIds } }).exec();
    }
    async update(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                description: dto.description,
                agreement: dto.agreement,
                classification: dto.classification,
                start_at: dto.start_at,
                end_at: dto.end_at,
                days_to_tiebreaker: dto.days_to_tiebreaker,
                days_to_delivery: dto.days_to_delivery,
                local_to_delivery: dto.local_to_delivery,
                status: dto.status,
                aditional_site: dto.aditional_site,
                add_allotment: dto.add_allotment,
                invited_suppliers: dto.invited_suppliers,
            },
        }, { new: true });
    }
    async updateStatus(_id, dto) {
        return await this._model
            .findOneAndUpdate({ _id }, {
            $set: {
                status: dto.status,
                proofreader: dto.proofreader,
                declined_reason: dto.declined_reason,
            },
        }, { new: true })
            .populate("agreement")
            .populate("association")
            .populate({ path: "agreement", populate: { path: "manager" } });
    }
    async changeStatus(_id, dto) {
        if (dto.status === bid_status_enum_1.BidStatusEnum.completed) {
            return await this._model.findOneAndUpdate({ _id }, {
                $set: {
                    status: dto.status,
                    concludedAt: new Date(),
                },
            }, { new: true });
        }
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                status: dto.status,
            },
        }, { new: true });
    }
    async addProposal(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $push: {
                proposal_list: dto.proposal_id,
            },
        }, { new: true });
    }
    async listAllotmentByBidId(_id) {
        return await this._model
            .find({ _id })
            .populate("agreement")
            .populate("invited_suppliers")
            .populate("add_allotment")
            .populate("association")
            .populate("add_allotment.proposals");
    }
    async listNonDeletedBids() {
        return await this._model.find({ deleted: false }).populate("agreement").populate("association");
    }
    async listBidByStatus(status) {
        return await this._model.find({ status: bid_status_enum_1.BidStatusEnum[status] });
    }
    async listForDashboard() {
        return await this._model.find({ status: bid_status_enum_1.BidStatusEnum["open"] });
    }
    async list() {
        return await this._model
            .find()
            .populate("add_allotment")
            .populate("agreement.association")
            .populate({ path: "agreement", populate: { path: "workPlan" } })
            .populate({ path: "agreement", populate: { path: "association" } })
            .populate("invited_suppliers")
            .populate("association")
            .populate({ path: "association", populate: { path: "association" } })
            .populate("add_allotment.proposals.proposedBy");
    }
    async getById(_id) {
        return await this._model
            .findById({ _id })
            .populate("add_allotment")
            .populate("agreement")
            .populate({ path: "agreement", populate: { path: "manager" } })
            .populate({ path: "agreement", populate: { path: "association" } })
            .populate("invited_suppliers")
            .populate("association")
            .populate({ path: "association", populate: { path: "association" } });
    }
    async getBidById(_id) {
        return await this._model.findOne({ _id }).populate("invited_suppliers").populate("association");
    }
    async deleteById(_id) {
        return await this._model.findByIdAndUpdate({ _id }, { $set: { deleted: true } }, { new: true });
    }
    async rotineStatus(_id, status) {
        return await this._model.findByIdAndUpdate({ _id }, { $set: { status: status } }, { new: true });
    }
    async addStartHour(_id, hour) {
        const ele = await this._model.findByIdAndUpdate({ _id }, { $set: { start_at: hour } }, { new: true });
        return ele;
    }
    async addEndHour(_id, hour) {
        return await this._model.findByIdAndUpdate({ _id }, { $set: { end_at: hour } }, { new: true });
    }
    async listForSupplier(_id) {
        return await this._model
            .find({
            $and: [
                {
                    $or: [
                        { modality: "openClosed" },
                        {
                            modality: "openInvite",
                            invited_suppliers: _id,
                        },
                        {
                            modality: "closedInvite",
                            invited_suppliers: _id,
                        },
                    ],
                },
                {
                    $or: [
                        { status: bid_status_enum_1.BidStatusEnum.open },
                        { status: bid_status_enum_1.BidStatusEnum.tiebreaker },
                        { status: bid_status_enum_1.BidStatusEnum.analysis },
                        { status: bid_status_enum_1.BidStatusEnum.deserted },
                        { status: bid_status_enum_1.BidStatusEnum.canceled },
                        { status: bid_status_enum_1.BidStatusEnum.failed },
                        { status: bid_status_enum_1.BidStatusEnum.released },
                        { status: bid_status_enum_1.BidStatusEnum.reopened },
                        { status: bid_status_enum_1.BidStatusEnum.completed },
                        { status: bid_status_enum_1.BidStatusEnum.tiebreaker, invited_suppliers: _id },
                    ],
                },
            ],
        })
            .populate("agreement")
            .populate("association")
            .populate({ path: "association", populate: { path: "association" } })
            .populate("invited_suppliers");
    }
    async listByIds(ids) {
        return await this._model
            .find({ _id: { $in: ids } })
            .populate("agreement")
            .populate("association")
            .populate({ path: "association", populate: { path: "association" } })
            .populate("invited_suppliers");
    }
    async sendTieBreaker(_id, suppliers) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                status: bid_status_enum_1.BidStatusEnum.tiebreaker,
                invited_suppliers: suppliers,
            },
        }, { new: true });
    }
    async listWithoutConcluded() {
        return await this._model.find({
            $and: [{ status: { $ne: bid_status_enum_1.BidStatusEnum.completed } }, { status: { $ne: bid_status_enum_1.BidStatusEnum.deserted } }],
        });
    }
    async count() {
        return await this._model.countDocuments();
    }
};
BidRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bids_schema_1.Bids.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        agreement_repository_1.AgreementRepository])
], BidRepository);
exports.BidRepository = BidRepository;
//# sourceMappingURL=bid.repository.js.map