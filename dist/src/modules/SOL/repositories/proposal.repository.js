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
exports.ProposalRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const proposal_schema_1 = require("../schemas/proposal.schema");
const proposal_status_enum_1 = require("../enums/proposal-status.enum");
const user_repository_1 = require("./user.repository");
let ProposalRepository = class ProposalRepository {
    constructor(_model, _userRepository) {
        this._model = _model;
        this._userRepository = _userRepository;
    }
    async register(dto) {
        const data = await new this._model(dto);
        return data.save();
    }
    async addItem(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $push: {
                item_list: dto.item_list,
            }
        }, { new: true });
    }
    async removeItem(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $pull: {
                item_list: dto.item_list,
            }
        }, { new: true });
    }
    async updateStatus(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                status: dto.status,
            }
        }, { new: true });
    }
    async updateAcceptSupplier(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                supplier_accept: dto.supplier_accept,
            }
        }, { new: true });
    }
    async updateAcceptAssociation(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                association_accept: dto.association_accept,
            }
        }, { new: true });
    }
    async updateAcceptReviewer(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                acceptedRevisorAt: dto.acceptedRevisorAt,
                reviewer_accept: dto.reviewer_accept
            }
        }, { new: true }).populate('acceptedFornecedor')
            .populate('allotment')
            .populate({ path: 'allotment', populate: 'proposals' });
    }
    async updateProposedWin(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                proposalWin: dto.proposalWin,
            }
        }, { new: true });
    }
    async updateListProposedWin(_ids, dto) {
        await this._model.updateMany({ _id: { $in: _ids } }, {
            $set: {
                proposalWin: dto.proposalWin,
            }
        }, { new: true });
    }
    async refusedProposal(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                refusedBecaused: dto.refusedBecaused,
                refusedBy: dto.refusedBy,
                status: dto.status,
                refusedAt: dto.refusedAt
            }
        }, { new: true });
    }
    async acceptForFornecedorProposal(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                acceptedFornecedorAt: dto.acceptAt,
                acceptedFornecedor: dto.acceptBy,
                status: dto.status,
                association_accept: true
            }
        }, { new: true });
    }
    async acceptForRevisorProposal(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                acceptedRevisorAt: dto.acceptAt,
                acceptedRevisor: dto.acceptBy,
                status: dto.status,
                supplier_accept: true
            }
        }, { new: true });
    }
    async listNonDeleted() {
        return await this._model.find({ deleted: false });
    }
    async listByBid(bidId) {
        const proposals = await this._model.find({ bid: { _id: bidId } })
            .populate('proposedBy')
            .populate({ path: 'proposedBy', populate: 'supplier' })
            .populate('refusedBy').populate('acceptedFornecedor')
            .populate('acceptedRevisor').populate('allotment')
            .sort({ total_value: "descending" });
        return proposals;
    }
    async listByUser(proposedById) {
        const proposedByUser = await this._userRepository.getById(proposedById);
        const supplier_user = await this._userRepository.getUserBySupplierId(proposedByUser.supplier._id);
        const supplierIds = supplier_user.map(user => user._id);
        const supplierObjectIds = supplierIds.map(id => new mongoose_2.default.Types.ObjectId(id));
        const proposals = await this._model.find({ proposedBy: { $in: supplierObjectIds } }).populate('proposedBy').populate('allotment');
        return proposals;
    }
    async listByBidsWaiting(bidId) {
        const proposals = await this._model.find({ bid: { _id: bidId } }).populate('proposedBy').populate('refusedBy').populate('acceptedFornecedor').populate('acceptedRevisor').populate('allotment');
        if (proposals.length > 1) {
            const sortedProposals = proposals.sort((a, b) => Number(a.total_value) - Number(b.total_value));
            let response = [];
            for (let iterator of sortedProposals) {
                if (iterator.status === proposal_status_enum_1.ProposalStatusEnum['aguardando1'] || iterator.status === proposal_status_enum_1.ProposalStatusEnum['aguardando2']) {
                    response.push(iterator);
                }
            }
            return response;
        }
        else {
            return proposals;
        }
    }
    async getProposalWin(bidId) {
        const list = await this._model.find({ bid: { _id: bidId } });
        const sortedProposals = list.sort((a, b) => Number(a.total_value) - Number(b.total_value)).filter(el => el.status === proposal_status_enum_1.ProposalStatusEnum['aguardando1'] || el.status === proposal_status_enum_1.ProposalStatusEnum['aguardando2']);
        return sortedProposals[0];
    }
    async list() {
        return await this._model.find().populate('proposedBy').populate('refusedBy').populate('acceptedFornecedor').populate('acceptedRevisor').populate('allotment');
    }
    async getById(_id) {
        return await this._model.findOne({ _id }).populate('proposedBy').populate('refusedBy').populate('acceptedFornecedor').populate('acceptedRevisor').populate('allotment');
    }
    async deleteById(_id) {
        return await this._model.findByIdAndUpdate({ _id }, { $set: { deleted: true } }, { new: true });
    }
    async updateValues(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, { $set: { total_value: dto.total_value, freight: dto.freight } }, { new: true });
    }
    async listProposalByUserSupplier(_id) {
        return await this._model.find()
            .populate('proposedBy')
            .populate('refusedBy')
            .populate('acceptedFornecedor')
            .populate('acceptedRevisor')
            .populate('allotment')
            .populate('bid');
    }
    async listProposalByBidTie(bidId) {
        return await this._model.find({ bid: { _id: bidId }, proposalWin: true }).populate('proposedBy').populate('refusedBy').populate('acceptedFornecedor').populate('acceptedRevisor').populate('allotment').populate('bid');
    }
    async listBiBidsIds(bidsIds) {
        return await this._model.find({ bid: { $in: bidsIds } }).populate('proposedBy').populate('refusedBy').populate('acceptedFornecedor').populate('acceptedRevisor').populate('allotment').populate('bid');
    }
};
ProposalRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(proposal_schema_1.Proposal.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_repository_1.UserRepository])
], ProposalRepository);
exports.ProposalRepository = ProposalRepository;
//# sourceMappingURL=proposal.repository.js.map