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
var ProposalService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalService = void 0;
const common_1 = require("@nestjs/common");
const proposal_repository_1 = require("../repositories/proposal.repository");
const proposal_status_enum_1 = require("../enums/proposal-status.enum");
const allotment_repository_1 = require("../repositories/allotment.repository");
const bid_repository_1 = require("../repositories/bid.repository");
const proposal_get_by_bid_response_dto_1 = require("../dtos/proposal-get-by-bid-response.dto");
const user_repository_1 = require("../repositories/user.repository");
const user_type_enum_1 = require("../enums/user-type.enum");
const notification_service_1 = require("./notification.service");
const allotment_service_1 = require("./allotment.service");
const allotment_status_enum_1 = require("../enums/allotment-status.enum");
const bid_status_enum_1 = require("../enums/bid-status.enum");
const contract_status_enum_1 = require("../enums/contract-status.enum");
const contract_service_1 = require("./contract.service");
const bid_service_1 = require("./bid.service");
const string_and_id_compare_helper_1 = require("../utils/string-and-id-compare.helper");
let ProposalService = ProposalService_1 = class ProposalService {
    constructor(_proposalRepository, _allotmentRepository, _allotmentService, _bidRepository, _userRepository, _contractService, _notificationService, _bidService) {
        this._proposalRepository = _proposalRepository;
        this._allotmentRepository = _allotmentRepository;
        this._allotmentService = _allotmentService;
        this._bidRepository = _bidRepository;
        this._userRepository = _userRepository;
        this._contractService = _contractService;
        this._notificationService = _notificationService;
        this._bidService = _bidService;
        this._logger = new common_1.Logger(ProposalService_1.name);
    }
    async register(proposedById, dto) {
        const proposedBy = await this._userRepository.getById(proposedById);
        let bid = await this._bidRepository.getById(dto.licitacaoId);
        if (bid.bid_type !== "globalPrice") {
            const allotment = await this._allotmentRepository.listById(dto.allotmentIds[0]);
            dto.allotment = [allotment];
        }
        else {
            const allotment = await this._allotmentRepository.listByIds(dto.allotmentIds);
            dto.allotment = allotment;
        }
        if (bid_status_enum_1.BidStatusEnum.open !== bid.status && bid_status_enum_1.BidStatusEnum.reopened !== bid.status)
            throw new common_1.BadRequestException("Não é possivel cadastrar proposta para licitação fechada!");
        dto.bid = bid;
        dto.proposedBy = proposedBy;
        dto.status = proposal_status_enum_1.ProposalStatusEnum["aguardando1"];
        const proposalList = await this._proposalRepository.listByBid(dto.licitacaoId);
        if (!proposalList.length) {
            dto.proposalWin = true;
            const result = await this._proposalRepository.register(dto);
            for (let iterator of dto.allotment) {
                const allotmentAddProposal = await this._allotmentRepository.addProposal(iterator._id, [
                    {
                        proposal: result,
                        proposalWin: dto.proposalWin,
                    },
                ]);
            }
            if (!result)
                throw new common_1.BadRequestException("Não foi possivel cadastrar essa proposta!");
            return result;
        }
        if (bid.bid_type === "globalPrice") {
            const verify = proposalList.some(el => (0, string_and_id_compare_helper_1.extractAndCompareContent)(el.proposedBy.supplier._id.toString(), proposedBy.supplier._id.toString()));
            if (verify) {
                throw new common_1.BadRequestException("Já foi enviado uma proposta para essa licitação!");
            }
        }
        if (bid.bid_type !== "globalPrice") {
            let verify = false;
            dto.allotment.forEach(el => {
                el.proposals.forEach(item => {
                    const proposal = proposalList.find(pro => (0, string_and_id_compare_helper_1.extractAndCompareContent)(pro._id.toString(), item.proposal._id.toString()));
                    if (proposal && (0, string_and_id_compare_helper_1.extractAndCompareContent)(proposal.proposedBy.supplier._id.toString(), proposedBy.supplier._id.toString())) {
                        verify = true;
                    }
                });
                if (verify) {
                    throw new common_1.BadRequestException("Já foi enviado uma proposta para essa licitação!");
                }
            });
        }
        const allotment = await this._allotmentRepository.listById(dto.allotmentIds[0]);
        const newProposal = [];
        allotment.proposals.forEach(el => {
            if (el.proposal) {
                el.proposal.proposalWin = false;
                newProposal.push({
                    proposal: el.proposal,
                    proposalWin: false,
                });
            }
        });
        if (bid.bid_type === "globalPrice") {
            await this._proposalRepository.updateListProposedWin(proposalList.map(item => item._id.toString()), { proposalWin: false });
            const objectWithSmallestValue = proposalList.reduce((prev, current) => {
                var _a, _b;
                return (current.total_value + ((_a = current.freight) !== null && _a !== void 0 ? _a : 0)) < (prev.total_value + ((_b = prev.freight) !== null && _b !== void 0 ? _b : 0)) ? current : prev;
            });
            if (dto.total_value === objectWithSmallestValue.total_value) {
                dto.proposalWin = true;
                const anotherWithSameValue = proposalList.filter(el => el.total_value === objectWithSmallestValue.total_value);
                if (anotherWithSameValue.length > 0) {
                    await this._proposalRepository.updateListProposedWin(anotherWithSameValue.map(item => item._id.toString()), { proposalWin: true });
                }
                if (newProposal.length > 0)
                    for (let data of anotherWithSameValue) {
                        const index = newProposal.findIndex(el => (0, string_and_id_compare_helper_1.extractAndCompareContent)(el.proposal._id.toString(), data._id.toString()));
                        if (newProposal[index]) {
                            data.proposalWin = true;
                            newProposal[index].proposalWin = true;
                            newProposal[index].proposal = data;
                        }
                    }
            }
            if (dto.total_value < objectWithSmallestValue.total_value) {
                dto.proposalWin = true;
            }
            if (dto.total_value > objectWithSmallestValue.total_value) {
                dto.proposalWin = false;
                const anotherWithSameValue = proposalList.filter(el => el.total_value === objectWithSmallestValue.total_value);
                if (anotherWithSameValue.length > 0) {
                    await this._proposalRepository.updateListProposedWin(anotherWithSameValue.map(item => item._id.toString()), { proposalWin: true });
                }
                if (newProposal.length > 0)
                    for (let data of anotherWithSameValue) {
                        const index = newProposal.findIndex(el => (0, string_and_id_compare_helper_1.extractAndCompareContent)(el.proposal._id, data._id.toString()));
                        if (newProposal[index]) {
                            data.proposalWin = true;
                            newProposal[index].proposalWin = true;
                            newProposal[index].proposal = data;
                        }
                    }
            }
        }
        if (bid.bid_type !== "globalPrice" && newProposal.length > 0) {
            await this._proposalRepository.updateListProposedWin(newProposal.map(item => item.proposal._id.toString()), { proposalWin: false });
            const proposalWithSmallValue = newProposal.reduce((prev, current) => {
                var _a, _b;
                return (current.proposal.total_value + ((_a = current.proposal.freight) !== null && _a !== void 0 ? _a : 0)) < (prev.proposal.total_value + ((_b = prev.proposal.freight) !== null && _b !== void 0 ? _b : 0)) ? current : prev;
            });
            if (dto.total_value === proposalWithSmallValue.proposal.total_value) {
                dto.proposalWin = true;
                const anotherWithSameValue = newProposal.filter(el => el.proposal.total_value === proposalWithSmallValue.proposal.total_value);
                if (anotherWithSameValue.length > 0) {
                    anotherWithSameValue.forEach((el, index) => {
                        const proposalIndex = newProposal.findIndex(item => (0, string_and_id_compare_helper_1.extractAndCompareContent)(item.proposal._id.toString(), el.proposal._id.toString()));
                        if (proposalIndex != -1) {
                            if (newProposal[proposalIndex]) {
                                newProposal[proposalIndex].proposalWin = true;
                                newProposal[proposalIndex].proposal = proposalList.find(a => (0, string_and_id_compare_helper_1.extractAndCompareContent)(a._id.toString(), el.proposal._id.toString()));
                                newProposal[proposalIndex].proposal.proposalWin = true;
                            }
                        }
                    });
                    await this._proposalRepository.updateListProposedWin(anotherWithSameValue.map(el => el.proposal._id.toString()), { proposalWin: true });
                }
            }
            if (dto.total_value <= proposalWithSmallValue.proposal.total_value) {
                dto.proposalWin = true;
            }
            if (dto.total_value > proposalWithSmallValue.proposal.total_value) {
                dto.proposalWin = false;
                const anotherWithSameValue = newProposal.filter(el => el.proposal.total_value === proposalWithSmallValue.proposal.total_value);
                if (anotherWithSameValue.length > 0) {
                    anotherWithSameValue.forEach((el, index) => {
                        const proposalIndex = newProposal.findIndex(item => (0, string_and_id_compare_helper_1.extractAndCompareContent)(item.proposal._id.toString(), el.proposal._id.toString()));
                        if (proposalIndex != -1) {
                            if (newProposal[proposalIndex]) {
                                newProposal[proposalIndex].proposalWin = true;
                                newProposal[proposalIndex].proposal = proposalList.find(a => (0, string_and_id_compare_helper_1.extractAndCompareContent)(a._id.toString(), el.proposal._id.toString()));
                                newProposal[proposalIndex].proposal.proposalWin = true;
                            }
                        }
                    });
                    await this._proposalRepository.updateListProposedWin(anotherWithSameValue.map(el => el.proposal._id.toString()), { proposalWin: true });
                }
            }
        }
        if (newProposal.length === 0) {
            dto.proposalWin = true;
        }
        const result = await this._proposalRepository.register(dto);
        if (!result)
            throw new common_1.BadRequestException("Não foi possivel cadastrar essa proposta!");
        newProposal.push({ proposal: result, proposalWin: dto.proposalWin });
        for (let iterator of dto.allotment) {
            await this._allotmentRepository.addProposal(iterator._id, newProposal);
        }
        return result;
    }
    async list() {
        const result = await this._proposalRepository.listNonDeleted();
        return result;
    }
    async updateAcceptfromSupplier(_id, dto) {
        const item = await this._proposalRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException("Proposta não encontrada!");
        }
        const result = await this._proposalRepository.updateAcceptSupplier(_id, dto);
        if (result.supplier_accept === true && result.association_accept === true) {
            const newDto = {
                status: proposal_status_enum_1.ProposalStatusEnum.aceitoRevisor,
            };
            await this._proposalRepository.updateStatus(_id, newDto);
        }
        return result;
    }
    async updateAcceptAssociation(_id, dto) {
        const item = await this._proposalRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException("Proposta não encontrada!");
        }
        const result = await this._proposalRepository.updateAcceptAssociation(_id, dto);
        if (result.supplier_accept === true && result.association_accept === true) {
            const newDto = {
                status: proposal_status_enum_1.ProposalStatusEnum.aceitoAssociacao,
            };
            await this._proposalRepository.updateStatus(_id, newDto);
        }
        return result;
    }
    async updateAcceptReviewer(_id, dto, userId) {
        const item = await this._proposalRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException("Proposta não encontrada!");
        }
        const result = await this._proposalRepository.updateAcceptReviewer(_id, dto);
        if (dto.reviewer_accept === false) {
            await this._allotmentService.updateStatus(result.allotment[0]._id, allotment_status_enum_1.AllotmentStatusEnum.fracassado);
            result.allotment[0].status = allotment_status_enum_1.AllotmentStatusEnum.fracassado;
        }
        if (result.association_accept && result.reviewer_accept) {
            await this._allotmentService.updateStatus(result.allotment[0]._id, allotment_status_enum_1.AllotmentStatusEnum.adjudicado);
            return await this.acceptProposal(result._id.toString(), userId);
        }
        return result;
    }
    async refusedProposal(proposalId, refusedById, dto) {
        const refusedBy = await this._userRepository.getById(refusedById);
        const proposal = await this._proposalRepository.getById(proposalId);
        const list = await this._proposalRepository.listByBid(proposal.bid._id);
        if (refusedBy.type !== "administrador") {
            if (list.length > 1) {
                const listOrder = await list
                    .filter(proposal => proposal.total_value !== null && Number(proposal.total_value) > 0)
                    .sort((a, b) => Number(a.total_value) - Number(b.total_value));
                await this._proposalRepository.updateProposedWin(listOrder[1]._id, { proposalWin: true });
                await this._proposalRepository.updateProposedWin(proposal._id, { proposalWin: false });
            }
            else {
                await this._proposalRepository.updateProposedWin(proposal._id, { proposalWin: false });
            }
        }
        else {
            const result = await this._proposalRepository.updateProposedWin(proposal._id, { proposalWin: false });
        }
        dto.refusedAt = new Date();
        dto.refusedBy = refusedBy;
        if (refusedBy.type === user_type_enum_1.UserTypeEnum["associacao"]) {
            dto.status = proposal_status_enum_1.ProposalStatusEnum["recusadaAssociacao"];
        }
        else {
            dto.status = proposal_status_enum_1.ProposalStatusEnum["recusadaRevisor"];
        }
        for (let iterator of proposal.allotment) {
            await this._allotmentService.updateStatus(iterator._id.toString(), allotment_status_enum_1.AllotmentStatusEnum.cancelado);
        }
        return await this._proposalRepository.refusedProposal(proposalId, dto);
    }
    async acceptProposal(proposalId, acceptById, dto) {
        const acceptBy = await this._userRepository.getById(acceptById);
        let obj = {
            status: proposal_status_enum_1.ProposalStatusEnum.aceitoAssociacao,
            acceptBy: acceptBy,
            acceptAt: new Date(),
        };
        if (acceptBy.type === user_type_enum_1.UserTypeEnum.associacao) {
            obj.status = proposal_status_enum_1.ProposalStatusEnum.aceitoAssociacao;
            const proposal = await this._proposalRepository.getById(proposalId);
            const dto = {
                association_accept: true
            };
            await this._proposalRepository.updateAcceptAssociation(proposal._id.toString(), dto);
            for (let iterator of proposal.allotment) {
                await this._allotmentService.updateStatus(iterator._id.toString(), allotment_status_enum_1.AllotmentStatusEnum.adjudicado);
            }
            await this._proposalRepository.acceptForFornecedorProposal(proposalId, obj);
            for (let iterator of proposal.allotment) {
                const proposalSave = await this._proposalRepository.getById(proposalId);
                const index = iterator.proposals.findIndex(i => i.proposal._id.toString() === proposalSave._id.toString());
                iterator.proposals[index].proposal = proposalSave;
                const teste = await this._allotmentRepository.register(iterator);
            }
            return await this._proposalRepository.updateStatus(proposal._id, obj);
        }
        else {
            obj.status = proposal_status_enum_1.ProposalStatusEnum.aceitoRevisor;
            const proposal = await this._proposalRepository.getById(proposalId);
            const bid = await this._bidRepository.getById(proposal.bid._id);
            let contractDto = {
                contract_number: "1",
                bid_number: proposal.bid._id,
                value: proposal.total_value,
                contract_document: "teste",
                association_accept: false,
                supplier_accept: false,
                status: contract_status_enum_1.ContractStatusEnum.aguardando_assinaturas,
                proposal_id: [proposal],
                association_id: bid._id,
                supplier_id: proposal.proposedBy.supplier._id,
            };
            await this._bidRepository.changeStatus(proposal.bid._id, { status: bid_status_enum_1.BidStatusEnum["completed"] });
            await this._allotmentRepository.updateStatusByIds(proposal.allotment.map(item => item._id.toString()), allotment_status_enum_1.AllotmentStatusEnum.adjudicado);
            for (let iterator of proposal.allotment) {
                const proposalSave = await this._proposalRepository.getById(proposalId);
                const index = iterator.proposals.findIndex(i => i.proposal._id.toString() === proposalSave._id.toString());
                iterator.proposals[index].proposal = proposalSave;
                const teste = await this._allotmentRepository.register(iterator);
            }
            const result = await this._proposalRepository.acceptForRevisorProposal(proposalId, obj);
            const responseContract = await this._contractService.register(contractDto);
            return result;
        }
    }
    async updateStatus(_id, dto) {
        const item = await this._proposalRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException("Proposta não encontrada!");
        }
        const result = await this._proposalRepository.updateStatus(_id, dto);
        return result;
    }
    async getByUserInBid(proposedById, allotmentId) {
        const proposalList = await this._proposalRepository.listByUser(proposedById);
        const verify = await proposalList.filter(el => el.allotment.find(elemento => elemento._id.toString() === allotmentId));
        if (verify.length !== 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async addItem(_id, dto) {
        const item = await this._proposalRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException("Proposta não encontrada!");
        }
        const result = await this._proposalRepository.addItem(_id, dto);
        return result;
    }
    async removeItem(_id, dto) {
        const item = await this._proposalRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException("Proposta não encontrada!");
        }
        const result = await this._proposalRepository.removeItem(_id, dto);
        return result;
    }
    async getById(_id) {
        const result = await this._proposalRepository.getById(_id);
        if (!result) {
            throw new common_1.BadRequestException("Proposta não encontrada!");
        }
        if (result.deleted === true) {
            throw new common_1.BadRequestException("Esse contrato já foi deletado!");
        }
        return result;
    }
    async deleteById(_id) {
        return await this._proposalRepository.deleteById(_id);
    }
    async listByBid(bidId) {
        const proposals = await this._proposalRepository.listByBid(bidId);
        const bid = await this._bidService.getById(bidId);
        return new proposal_get_by_bid_response_dto_1.ProposalGetByBidResponseDto(proposals, bid);
    }
    async getProposalAcceptByBid(bidId) {
        const proposals = await this._proposalRepository.listByBid(bidId);
        let result = undefined;
        for (let iterator of proposals) {
            if (iterator.acceptedFornecedor && iterator.proposalWin === true) {
                result = iterator;
            }
        }
        return result;
    }
    async proposalWinForBid(bidId) {
        const list = await this._proposalRepository.listByBidsWaiting(bidId);
        if (list) {
            if (list.length >= 1) {
                const objectWithSmallestValue = list.reduce((prev, current) => {
                    if (current.total_value < prev.total_value) {
                        return current;
                    }
                    else {
                        return prev;
                    }
                });
                return objectWithSmallestValue;
            }
            else {
                return list[0];
            }
        }
        else {
            return undefined;
        }
    }
    async proposalWinUpdate(bidId) {
        const proposalWinAtMoment = await this._proposalRepository.getProposalWin(bidId);
        if (proposalWinAtMoment) {
            let request = {
                proposalWin: false,
            };
            return await this._proposalRepository.updateProposedWin(proposalWinAtMoment._id, request);
        }
        else {
            return undefined;
        }
    }
    async updateValues(id, dto) {
        const newProposal = await this._proposalRepository.updateValues(id, dto);
        const list = await this._proposalRepository.listByBid(newProposal.bid._id);
        const allotment = await this._allotmentRepository.listByIds(newProposal.allotment.map(item => item._id.toString()));
        const newAllotmentProposal = [];
        allotment.forEach(item => {
            item.proposals.forEach(el => {
                el.proposal.proposalWin = false;
                newAllotmentProposal.push({
                    allomentId: item._id.toString(),
                    proposal: el.proposal,
                    proposalWin: false,
                });
            });
        });
        if (list) {
            if (list[0].bid.bid_type === "globalPrice") {
                await this._proposalRepository.updateListProposedWin(list.map(item => item._id.toString()), { proposalWin: false });
                const objectWithSmallestValue = list.reduce((prev, current) => {
                    return current.total_value < prev.total_value ? current : prev;
                });
                const anotherWithSameValue = list.filter(el => el.total_value === objectWithSmallestValue.total_value);
                if (anotherWithSameValue.length >= 1) {
                    await this._proposalRepository.updateListProposedWin(anotherWithSameValue.map(item => item._id.toString()), { proposalWin: true });
                    if (newAllotmentProposal.length > 0)
                        for (let data of anotherWithSameValue) {
                            const index = newAllotmentProposal.findIndex(el => el.proposal._id.toString() === data._id.toString());
                            data.proposalWin = true;
                            newAllotmentProposal[index].proposalWin = true;
                            newAllotmentProposal[index].proposal = data;
                        }
                }
            }
            if (list[0].bid.bid_type !== "globalPrice" && newAllotmentProposal.length > 0) {
                await this._proposalRepository.updateListProposedWin(newAllotmentProposal.map(item => item.proposal._id.toString()), { proposalWin: false });
                const proposalWithSmallValue = newAllotmentProposal.reduce((prev, current) => {
                    var _a, _b;
                    return (current.proposal.total_value + ((_a = current.proposal.freight) !== null && _a !== void 0 ? _a : 0)) < (prev.proposal.total_value + ((_b = prev.proposal.freight) !== null && _b !== void 0 ? _b : 0)) ? current : prev;
                });
                const anotherWithSameValue = newAllotmentProposal.filter(el => el.proposal.total_value === proposalWithSmallValue.proposal.total_value);
                if (anotherWithSameValue.length > 0) {
                    anotherWithSameValue.forEach(el => {
                        const proposalIndex = newAllotmentProposal.findIndex(item => item.proposal._id.toString() === el.proposal._id.toString());
                        const data = list.find(a => a._id.toString() === el.proposal._id.toString());
                        if (proposalIndex != -1 && data) {
                            newAllotmentProposal[proposalIndex].proposalWin = true;
                            newAllotmentProposal[proposalIndex].proposal = data;
                            newAllotmentProposal[proposalIndex].proposal.proposalWin = true;
                        }
                    });
                    await this._proposalRepository.updateListProposedWin(anotherWithSameValue.map(el => el.proposal._id.toString()), { proposalWin: true });
                }
            }
        }
        for (let iterator of allotment) {
            const array = newAllotmentProposal
                .filter(el => el.allomentId === iterator._id.toString())
                .map(item => {
                return { proposal: item.proposal, proposalWin: item.proposalWin };
            });
            await this._allotmentRepository.addProposal(iterator._id, array);
        }
        return newProposal;
    }
};
ProposalService = ProposalService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [proposal_repository_1.ProposalRepository,
        allotment_repository_1.AllotmentRepository,
        allotment_service_1.AllotmentService,
        bid_repository_1.BidRepository,
        user_repository_1.UserRepository,
        contract_service_1.ContractService,
        notification_service_1.NotificationService,
        bid_service_1.BidService])
], ProposalService);
exports.ProposalService = ProposalService;
//# sourceMappingURL=proposal.service.js.map