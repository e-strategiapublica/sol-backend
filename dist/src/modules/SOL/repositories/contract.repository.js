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
exports.ContractRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const contract_schema_1 = require("../schemas/contract.schema");
const contract_status_enum_1 = require("../enums/contract-status.enum");
const bid_status_enum_1 = require("../enums/bid-status.enum");
let ContractRepository = class ContractRepository {
    constructor(_model) {
        this._model = _model;
    }
    async register(dto) {
        const data = await new this._model(dto);
        const saveResult = await data.save();
        await this._model.findOneAndUpdate({ _id: saveResult._id }, { $inc: { sequencial_number: 1 } }, { new: true });
        return saveResult;
    }
    async addProposal(dto) {
        const data = await new this._model(dto);
        return await data.save();
    }
    async updateStatus(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                status: dto.status,
            },
        }, { new: true });
    }
    async updateContractNumber(_id, sequencial) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                contract_number: `${sequencial}/${new Date().getFullYear()}`,
            },
        }, { new: true });
    }
    async signAssociation(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                association_accept: true,
                association_id: dto.association_id,
                association_sign_date: new Date().toDateString(),
            },
        }, { new: true });
    }
    async signSupplier(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                supplier_accept: true,
                supplier_id: dto.association_id,
                supplier_sign_date: new Date().toDateString(),
            },
        }, { new: true });
    }
    async checkAllsignatures(_id) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                status: contract_status_enum_1.ContractStatusEnum.assinado,
            },
        }, { new: true });
    }
    async list() {
        return await this._model
            .find()
            .populate("bid_number")
            .populate({ path: "bid_number", populate: { path: "agreement" } })
            .populate("association_id")
            .populate("supplier_id")
            .populate("proposal_id");
    }
    async listByAssociationId(_id) {
        return await this._model
            .find({ association_id: _id })
            .populate("bid_number")
            .populate({ path: "bid_number", populate: { path: "agreement" } })
            .populate("association_id")
            .populate("supplier_id")
            .populate("proposal_id");
    }
    async listBidStatusCompleted() {
        let teste = await this._model
            .find({ "bid_number.status": bid_status_enum_1.BidStatusEnum.completed })
            .populate("bid_number")
            .populate({ path: "bid_number", populate: { path: "agreement" } })
            .populate("association_id")
            .populate("supplier_id")
            .populate("proposal_id");
        return teste;
    }
    async listNonDeleted() {
        return await this._model
            .find({ delete: false })
            .populate("bid_number")
            .populate({ path: "bid_number", populate: { path: "agreement" } })
            .populate("association_id")
            .populate("supplier_id")
            .populate("proposal_id");
    }
    async getById(_id) {
        return await this._model
            .findOne({ _id })
            .populate("bid_number")
            .populate({
            path: "bid_number",
            populate: [
                { path: "agreement", populate: { path: "association" } },
                { path: "add_allotment" },
                { path: "association", populate: [{ path: "association" }] },
                { path: "invited_suppliers" }
            ],
        })
            .populate("association_id")
            .populate("supplier_id")
            .populate({ path: "proposal_id", populate: [{ path: "allotment" }] });
    }
    async getByBidId(_id) {
        return await this._model
            .find({ bid_number: _id })
            .populate("bid_number")
            .populate({
            path: "bid_number",
            populate: [{ path: "agreement" }, { path: "add_allotment" }, { path: "association" }],
        })
            .populate("association_id")
            .populate("supplier_id")
            .populate("proposal_id");
    }
    async deleteById(_id) {
        return await this._model.findByIdAndUpdate({ _id }, {
            $set: {
                delete: true,
            },
        }, { new: true });
    }
    async updateStatusAndItens(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                status: dto.status,
                items_received: dto.items_received,
            },
        });
    }
    async updateValueAndProposal(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                value: dto.value,
                proposal_id: dto.proposal,
            },
        });
    }
    async listByBidIds(_ids) {
        return await this._model.find({ bid_number: { $in: _ids } }).populate("proposal_id");
    }
};
ContractRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(contract_schema_1.Contract.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ContractRepository);
exports.ContractRepository = ContractRepository;
//# sourceMappingURL=contract.repository.js.map