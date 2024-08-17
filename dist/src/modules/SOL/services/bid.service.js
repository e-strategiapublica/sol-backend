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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var BidService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidService = void 0;
const common_1 = require("@nestjs/common");
const bid_repository_1 = require("../repositories/bid.repository");
const user_repository_1 = require("../repositories/user.repository");
const allotment_repository_1 = require("../repositories/allotment.repository");
const notification_service_1 = require("./notification.service");
const bid_modality_enum_1 = require("../enums/bid-modality.enum");
const agreement_service_1 = require("./agreement.service");
const file_repository_1 = require("../repositories/file.repository");
const allotment_status_enum_1 = require("../enums/allotment-status.enum");
const supplier_service_1 = require("./supplier.service");
const schedule_1 = require("@nestjs/schedule");
const bid_status_enum_1 = require("../enums/bid-status.enum");
const proposal_repository_1 = require("../repositories/proposal.repository");
const supplier_repository_1 = require("../repositories/supplier.repository");
const association_repository_1 = require("../repositories/association.repository");
const model_contract_repository_1 = require("../repositories/model-contract.repository");
const contract_repository_1 = require("../repositories/contract.repository");
const moment = require("moment");
const plataform_repository_1 = require("../repositories/plataform.repository");
const node_process_1 = require("node:process");
const user_type_enum_1 = require("../enums/user-type.enum");
const date_fns_1 = require("date-fns");
const language_contract_enum_1 = require("../enums/language-contract.enum");
const cost_items_service_1 = require("./cost-items.service");
const registry_service_1 = require("./registry.service");
const registry_send_request_dto_1 = require("../dtos/registry-send-request.dto");
const config_1 = require("@nestjs/config");
const project_service_1 = require("./project.service");
const mongodb_1 = require("mongodb");
const lacchain_model_1 = require("../models/blockchain/lacchain.model");
const bid_model_1 = require("../models/database/bid.model");
const bid_history_model_1 = require("../models/database/bid_history.model");
const items_model_1 = require("../models/database/items.model");
const crypto_js_1 = require("crypto-js");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
let BidService = BidService_1 = class BidService {
    constructor(_bidsRepository, _userRepository, _allotmentRepository, _notificationService, _agreementService, _fileRepository, _supplierService, _proposalRepository, _contractRepository, _modelContractRepository, _associationRepository, _supplierRepository, _plataformRepository, _costItemsService, _registryService, _configService, _projectService, _lacchainModel, _myBidModel, _bidHistoryModel, itemsModel) {
        this._bidsRepository = _bidsRepository;
        this._userRepository = _userRepository;
        this._allotmentRepository = _allotmentRepository;
        this._notificationService = _notificationService;
        this._agreementService = _agreementService;
        this._fileRepository = _fileRepository;
        this._supplierService = _supplierService;
        this._proposalRepository = _proposalRepository;
        this._contractRepository = _contractRepository;
        this._modelContractRepository = _modelContractRepository;
        this._associationRepository = _associationRepository;
        this._supplierRepository = _supplierRepository;
        this._plataformRepository = _plataformRepository;
        this._costItemsService = _costItemsService;
        this._registryService = _registryService;
        this._configService = _configService;
        this._projectService = _projectService;
        this._lacchainModel = _lacchainModel;
        this._myBidModel = _myBidModel;
        this._bidHistoryModel = _bidHistoryModel;
        this.itemsModel = itemsModel;
        this._logger = new common_1.Logger(BidService_1.name);
    }
    async handleCron() {
        this._logger.debug("rotine status bids");
        const allBids = await this._bidsRepository.listWithoutConcluded();
        for (let bid of allBids) {
            if (bid.status === bid_status_enum_1.BidStatusEnum.open ||
                bid.status === bid_status_enum_1.BidStatusEnum.reopened ||
                bid.status === bid_status_enum_1.BidStatusEnum.tiebreaker) {
                const date = new Date(bid.end_at);
                const now = new Date();
                if (date.getTime() < now.getTime()) {
                    try {
                        const proposal = await this._proposalRepository.listByBid(bid._id.toString());
                        if (!proposal.length) {
                            this._logger.debug("update to deserted " + bid._id);
                            await this._bidsRepository.rotineStatus(bid._id, bid_status_enum_1.BidStatusEnum.deserted);
                            await this._allotmentRepository.updateStatusByIds(bid.add_allotment.map((ele) => ele._id.toString()), allotment_status_enum_1.AllotmentStatusEnum.deserto);
                            continue;
                        }
                        this._logger.debug("update to analysis " + bid._id);
                        await this._bidsRepository.rotineStatus(bid._id, bid_status_enum_1.BidStatusEnum.analysis);
                        await this._allotmentRepository.updateStatusByIds(bid.add_allotment.map((ele) => ele._id.toString()), allotment_status_enum_1.AllotmentStatusEnum.emAnalise);
                        continue;
                    }
                    catch (error) {
                        this._logger.error("error update " + "bid._id" + " " + error);
                        continue;
                    }
                }
            }
            if (bid.status === bid_status_enum_1.BidStatusEnum.released) {
                const date = new Date(bid.start_at);
                const now = new Date();
                if (date.getTime() < now.getTime()) {
                    try {
                        this._logger.debug("update to open " + bid._id);
                        await this._bidsRepository.rotineStatus(bid._id, bid_status_enum_1.BidStatusEnum.open);
                        await this._allotmentRepository.updateStatusByIds(bid.add_allotment.map((ele) => ele._id.toString()), allotment_status_enum_1.AllotmentStatusEnum.aberta);
                        continue;
                    }
                    catch (error) {
                        this._logger.error("error update " + "bid._id" + " " + error);
                        continue;
                    }
                }
                const targetDate = bid.end_at;
                const currentDate = new Date();
                const parsedTargetDate = (0, date_fns_1.parseISO)(targetDate);
                const isTargetDateAfterCurrent = (0, date_fns_1.isAfter)(parsedTargetDate, currentDate);
                if (!isTargetDateAfterCurrent) {
                    const proposals = await this._proposalRepository.listByBid(bid._id);
                    if (proposals.length === 0) {
                        await this._bidsRepository.changeStatus(bid._id, {
                            status: bid_status_enum_1.BidStatusEnum["deserted"],
                        });
                        await this._allotmentRepository.updateStatusByIds(bid.add_allotment.map((ele) => ele._id.toString()), allotment_status_enum_1.AllotmentStatusEnum.deserto);
                    }
                }
            }
        }
    }
    async register(token, associationId, dto, files) {
        var _a, _b, _c, _d, _e;
        const count = await this._bidsRepository.count();
        if (!count) {
            const numberOfBids = await this._bidsRepository.list();
            dto.bid_count = (_a = (Number(numberOfBids.length) + 1)) === null || _a === void 0 ? void 0 : _a.toString();
        }
        else {
            dto.bid_count = (_b = (Number(count) + 1)) === null || _b === void 0 ? void 0 : _b.toString();
        }
        const association = await this._userRepository.getById(associationId);
        const agreement = await this._agreementService.findById(dto.agreementId);
        if (!agreement)
            throw new common_1.BadRequestException("Convênio não encontrado!");
        if (!association)
            throw new common_1.BadRequestException("Associação nao encontrada!");
        dto.agreement = agreement;
        dto.association = association;
        const now = new Date();
        if (dto.editalFile) {
            dto.editalFile = this._fileRepository.upload(`${dto.bid_count}-${now.getFullYear()}-edital-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.pdf`, dto.editalFile);
        }
        const aditionalFiles = [];
        files.forEach((file) => {
            aditionalFiles.push(file.buffer.toString("base64"));
        });
        dto.additionalDocuments = [];
        aditionalFiles.forEach((item, index) => {
            dto.additionalDocuments.push(this._fileRepository.upload(`${index}-${dto.bid_count}-${now.getFullYear()}-arquivo-complementar-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.pdf`, item));
        });
        let newArray = [];
        for (let i = 0; i < dto.add_allotment.length; i++) {
            dto.add_allotment[i].files = this._fileRepository.upload(`product_${new Date().getTime()}.pdf`, dto.add_allotment[i].files);
            dto.add_allotment[i].status = allotment_status_enum_1.AllotmentStatusEnum.rascunho;
            newArray.push(await this._allotmentRepository.register(dto.add_allotment[i]));
        }
        dto.add_allotment = newArray;
        let newId;
        if (!dto.add_allotment)
            throw new common_1.BadRequestException("Não foi possivel cadastrar essa licitação!");
        dto._id = new mongodb_1.ObjectId();
        const result = await this._bidsRepository.register(dto);
        if (!result) {
            throw new common_1.BadRequestException("Não foi possivel cadastrar essa licitação!");
        }
        newId = new mongodb_1.ObjectId();
        const bidHistoryId = newId.toHexString();
        const data = await this.createData(dto);
        const hash = await this.calculateHash(data);
        const txHash = await this._lacchainModel.setBidData(token, bidHistoryId, hash);
        await this._bidHistoryModel.insert(bidHistoryId, data, txHash);
        const obj = {
            title: `Convite para licitação de número ${dto.bid_count}`,
            description: dto.description,
            from_user: associationId,
            to_user: ["aaa"],
            deleted: false,
            bid_id: result._id,
        };
        await this._notificationService.registerForRealese((_c = result.agreement.manager) === null || _c === void 0 ? void 0 : _c._id.toString(), (_d = result.association) === null || _d === void 0 ? void 0 : _d._id.toString(), result._id.toString());
        if (dto.modality === bid_modality_enum_1.BidModalityEnum.openClosed) {
            const listSuppliers = await this._supplierService.list();
            const suppliers = listSuppliers
                .filter((item) => !item.blocked)
                .map((ele) => { var _a; return (_a = ele._id) === null || _a === void 0 ? void 0 : _a.toString(); });
            for (let j = 0; j < suppliers.length; j++) {
                await this._notificationService.registerByBidCreation(suppliers[j], obj);
            }
            return result;
        }
        else {
            if (result.invited_suppliers.length)
                for (let j = 0; j < result.invited_suppliers.length; j++) {
                    await this._notificationService.registerByBidCreation((_e = result.invited_suppliers[j]) === null || _e === void 0 ? void 0 : _e._id, obj);
                }
            return result;
        }
    }
    async findAgreementByReviewerOrManagerId(_id) {
        const agreements = await this._agreementService.findAgreementByReviewerOrManagerId(_id);
        const results = [];
        for (let i = 0; i < agreements.length; i++) {
            const bid = await this._bidsRepository.getByAgreementId(agreements[i]._id);
            if (bid)
                results.push(...bid);
        }
        return results;
    }
    async findAgreementByReviewerId(_id) {
        const projects = await this._projectService.findAllProjectsByReviewerId(_id);
        const agreement_list = [];
        for (let i = 0; i < projects.length; i++) {
            const agreement = await this._agreementService.findAgreementByProjectrId(projects[i]._id.toString());
            if (agreement)
                agreement_list.push(agreement);
        }
        const results = [];
        for (let i = 0; i < agreement_list.length; i++) {
            const bid = await this._bidsRepository.getByAgreementId(agreement_list[i]._id.toString());
            if (bid)
                results.push(...bid);
        }
        const myBid = await this._bidsRepository.getByReviewerId(_id);
        if (myBid)
            results.push(...myBid);
        return results;
    }
    async findAgreementByViewerId(_id) {
        const projects = await this._projectService.findAllProjectsByViewerId(_id);
        const agreement_list = [];
        for (let i = 0; i < projects.length; i++) {
            const agreement = await this._agreementService.findAgreementByProjectrId(projects[i]._id.toString());
            if (agreement)
                agreement_list.push(agreement);
        }
        const results = [];
        for (let i = 0; i < agreement_list.length; i++) {
            const bid = await this._bidsRepository.getByAgreementId(agreement_list[i]._id.toString());
            if (bid)
                results.push(...bid);
        }
        return results;
    }
    async findAgreementByProjectManagerId(_id) {
        const projects = await this._projectService.findAllProjectsByManagerId(_id);
        const agreement_list = [];
        for (let i = 0; i < projects.length; i++) {
            const agreement = await this._agreementService.findAgreementByProjectrId(projects[i]._id.toString());
            if (agreement)
                agreement_list.push(agreement);
        }
        const results = [];
        for (let i = 0; i < agreement_list.length; i++) {
            const bid = await this._bidsRepository.getByAgreementId(agreement_list[i]._id.toString());
            if (bid)
                results.push(...bid);
        }
        return results;
    }
    async findAgreementByManagerId(_id) {
        const agreements = await this._agreementService.findAgreementByManagerId(_id);
        const bd = await this._bidsRepository.list();
        const results = [];
        for (let i = 0; i < agreements.length; i++) {
            const bid = await this._bidsRepository.getByAgreementId(agreements[i]._id.toString());
            if (bid)
                results.push(...bid);
        }
        return results;
    }
    async list() {
        const result = await this._bidsRepository.list();
        return result;
    }
    async listAllotmentBydBidId(_id) {
        const result = await this._bidsRepository.listAllotmentByBidId(_id);
        if (!result) {
            throw new common_1.BadRequestException("Licitação não encontrada!");
        }
        return result;
    }
    async listByAssociation(userId) {
        var _a, _b;
        const user = await this._userRepository.getById(userId);
        const list = await this._bidsRepository.list();
        let verify = [];
        for (let item of list) {
            if (((_a = item.association) === null || _a === void 0 ? void 0 : _a.association._id.toString()) ===
                ((_b = user.association) === null || _b === void 0 ? void 0 : _b._id.toString())) {
                verify.push(item);
            }
        }
        return verify;
    }
    async update(_id, dto) {
        var _a, _b;
        const item = await this._bidsRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException("Não foi possivel atualizar a licitação!");
        }
        const agreement = await this._agreementService.findById(dto.agreementId);
        if (!agreement)
            throw new common_1.BadRequestException("Convênio não encontrado!");
        dto.agreement = agreement;
        let newArray = [];
        for (let i = 0; i < dto.add_allotment.length; i++) {
            if ((_a = dto.add_allotment[i]) === null || _a === void 0 ? void 0 : _a._id) {
                const old = await this._allotmentRepository.listById((_b = dto.add_allotment[i]) === null || _b === void 0 ? void 0 : _b._id);
                if (old) {
                    newArray.push(old);
                    continue;
                }
            }
            dto.add_allotment[i].files = this._fileRepository.upload(`product_${new Date().getTime()}.pdf`, dto.add_allotment[i].files);
            dto.add_allotment[i].status = allotment_status_enum_1.AllotmentStatusEnum.rascunho;
            newArray.push(await this._allotmentRepository.register(dto.add_allotment[i]));
        }
        if (dto.bid_type == "individualPrice") {
            for (let i = 0; i < dto.add_allotment.length; i++) {
                await this._allotmentRepository.editUpdate(dto.add_allotment[i]._id, dto.add_allotment[i]);
            }
        }
        dto.add_allotment = newArray;
        const result = await this._bidsRepository.update(_id, dto);
        return result;
    }
    async addProposal(_id, dto) {
        const item = await this._bidsRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException("Não foi possivel atualizar a adicionar proposta na licitação!");
        }
        const result = await this._bidsRepository.addProposal(_id, dto);
        return result;
    }
    async updateStatus(token, userId, _id, dto) {
        const user = await this._userRepository.getById(userId);
        if (!user)
            throw new common_1.BadRequestException("Usuário não encontrado!");
        if (user.type === "administrador")
            dto.proofreader = user;
        if (dto.status === "released") {
            const addDate = new Date();
            const nextDay = new Date(addDate.setDate(addDate.getDate() + 1))
                .toISOString()
                .slice(0, 10);
            let bid = await this._bidsRepository.getBidById(_id);
            const configs = await this._plataformRepository.findOne();
            if (!configs)
                throw new common_1.BadRequestException("Não foi possivel encontrar as configurações da plataforma!");
            const { start_at } = await this._bidsRepository.addStartHour(_id, `${nextDay}T${configs.start_at}`);
            const slicedData = start_at.slice(0, 10);
            const unix = new Date(slicedData);
            let unixTimeStamp = unix.setDate(unix.getDate() + Number(bid.end_at));
            let data = new Date(unixTimeStamp);
            let endDate = data.toISOString().slice(0, 10);
            await this._bidsRepository.addEndHour(_id, `${endDate}T${configs.end_at}`);
            const result = await this._bidsRepository.updateStatus(_id, dto);
            await this._allotmentRepository.updateStatusByIds(result.add_allotment.map((el) => el._id.toString()), allotment_status_enum_1.AllotmentStatusEnum.lancada);
            const registry = new registry_send_request_dto_1.RegistrySendRequestDto(Number(bid.bid_count), bid.description, bid.agreement, bid.classification, bid.start_at, bid.end_at, bid.days_to_tiebreaker, bid.days_to_delivery, bid.local_to_delivery, bid.bid_type, bid.modality, bid.aditional_site, bid.add_allotment, bid.invited_suppliers, bid.bid_count, bid.state, bid.city, bid.status, bid.association, bid.createdAt);
            bid.status = dto.status;
            const newId = new mongodb_1.ObjectId();
            const bidHistoryId = newId.toHexString();
            const newData = await this.createData(bid);
            const hash = await this.calculateHash(newData);
            const txHash = await this._lacchainModel.setBidData(token, bidHistoryId, hash);
            await this._bidHistoryModel.insert(bidHistoryId, newData, txHash);
            return result;
        }
        if (dto.allomentStatus) {
            const bid = await this._bidsRepository.getById(_id);
            await this._allotmentRepository.updateStatusByIds(bid.add_allotment.map((el) => el._id.toString()), dto.allomentStatus);
        }
        const result = await this._bidsRepository.updateStatus(_id, dto);
        const bid = await this._bidsRepository.getBidById(_id);
        bid.status = dto.status;
        const newId = new mongodb_1.ObjectId();
        const bidHistoryId = newId.toHexString();
        const newData = await this.createData(bid);
        const hash = await this.calculateHash(newData);
        const txHash = await this._lacchainModel.setBidData(token, bidHistoryId, hash);
        await this._bidHistoryModel.insert(bidHistoryId, newData, txHash);
        return result;
    }
    async updateOpenDate(dto) {
        const awaitingBids = await this._bidsRepository.listBidByStatus(bid_status_enum_1.BidStatusEnum.awaiting);
        const returnArray = [];
        for (let i = 0; i < awaitingBids.length; i++) {
            if (awaitingBids[i].start_at) {
                await this._bidsRepository.addStartHour(awaitingBids[i]._id, `${awaitingBids[i].start_at}-T:${dto.start_at}`);
            }
            if (awaitingBids[i].end_at) {
                const unix = new Date(awaitingBids[i].start_at);
                let unixTimeStamp = unix.setDate(unix.getDate() + Number(awaitingBids[i].days_to_delivery));
                let data = new Date(unixTimeStamp);
                let endDate = data.toISOString().slice(0, 10);
                returnArray.push(await this._bidsRepository.addEndHour(awaitingBids[i]._id, `${endDate}-T:${dto.end_at}`));
            }
        }
        return returnArray;
    }
    async getById(_id) {
        const result = await this._bidsRepository.getById(_id);
        for (let i = 0; i < result.add_allotment.length; i++) {
            for (let j = 0; j < result.add_allotment[i].proposals.length; j++) {
                result.add_allotment[i].proposals[j].proposal.proposedBy =
                    await this._userRepository.getById(result.add_allotment[i].proposals[j].proposal.proposedBy._id);
                const proposalDetails = await this._proposalRepository.getById(result.add_allotment[i].proposals[j].proposal._id);
                if (proposalDetails) {
                    const { reviewer_accept, acceptedRevisorAt } = proposalDetails;
                    if (reviewer_accept !== null) {
                        result.add_allotment[i].proposals[j].proposal.reviewer_accept =
                            reviewer_accept;
                    }
                    if (acceptedRevisorAt !== null) {
                        result.add_allotment[i].proposals[j].proposal.acceptedRevisorAt =
                            acceptedRevisorAt;
                    }
                }
            }
        }
        if (!result) {
            throw new common_1.BadRequestException("Licitação não encontrada!");
        }
        return result;
    }
    async deleteById(_id) {
        const result = await this._bidsRepository.deleteById(_id);
        if (!result) {
            throw new common_1.BadRequestException("Licitação não encontrada!");
        }
        return result;
    }
    async downloadFile(id, type) {
        const item = await this._bidsRepository.getById(id);
        let allFiles = [];
        if (!item) {
            throw new common_1.BadRequestException("Licitação não encontrada!");
        }
        for (let file of item.additionalDocuments) {
            const result = await this._fileRepository.download(file);
            allFiles.push({ result });
            if (!result) {
                throw new common_1.BadRequestException("Arquivo não encontrado!");
            }
        }
        return allFiles;
    }
    async listForSupplier(userId) {
        const user = await this._userRepository.getByIdPopulate(userId);
        if (user.type === user_type_enum_1.UserTypeEnum.associacao) {
            const list = await this._bidsRepository.listForSupplier(user.association._id);
            return list;
        }
        else {
            const supplier = await this._supplierService.listById(user.supplier._id);
            if (!supplier) {
                throw new common_1.BadRequestException("Fornecedor não encontrado!");
            }
            const list = await this._bidsRepository.listForSupplier(userId);
            return list;
        }
    }
    async listForProposalSupplier(userId) {
        const user = await this._userRepository.getByIdPopulate(userId);
        if (user.supplier) {
            const supplier = await this._supplierService.listById(user.supplier._id);
            if (!supplier) {
                throw new common_1.BadRequestException("Fornecedor não encontrado!");
            }
            const listProposal = await this._proposalRepository.listProposalByUserSupplier(supplier._id);
            let filteredList = [];
            for (let index = 0; index < listProposal.length; index++) {
                const element = listProposal[index];
                if (element.proposedBy &&
                    element.proposedBy.supplier &&
                    element.proposedBy.supplier._id.toString() &&
                    !!element.bid) {
                    filteredList.push(element);
                }
            }
            const list = await this._bidsRepository.listByIds(filteredList.map((ele) => { var _a, _b; return ((_a = ele.bid) === null || _a === void 0 ? void 0 : _a._id) ? (_b = ele.bid) === null || _b === void 0 ? void 0 : _b._id.toString() : ele.bid; }));
            return list;
        }
        else {
            throw new common_1.BadRequestException("Fornecedor não tem nenhuma licitação vinculada!");
        }
    }
    formatCNPJ(cnpj) {
        const cnpjSemPontuacao = cnpj.replace(/[^\d]+/g, "");
        if (cnpj.length !== cnpjSemPontuacao.length) {
            return cnpj;
        }
        return cnpjSemPontuacao.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    }
    async sendTieBreaker(_id) {
        const item = await this._bidsRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException("Licitação não encontrada!");
        }
        if (item.status !== bid_status_enum_1.BidStatusEnum.analysis) {
            throw new common_1.BadRequestException("Licitação não está em analise!");
        }
        const proposalTie = await this._proposalRepository.listProposalByBidTie(_id);
        if (!proposalTie.length) {
            throw new common_1.BadRequestException("Não foi encontrado propostas para desempate!");
        }
        const suppliers = [
            ...proposalTie.map((ele) => ele.proposedBy.supplier),
            ...item.invited_suppliers,
        ];
        const uniqueSuppliers = suppliers.filter((ele, index) => suppliers.findIndex((item) => item._id.toString() === ele._id.toString()) === index);
        return await this._bidsRepository.sendTieBreaker(_id, uniqueSuppliers);
    }
    async bidPdfDownload(_id, type) {
        let propostas = [];
        let convidados = [];
        let lotes = [];
        const respondseBids = await this._bidsRepository.getById(_id);
        const modelResponse = await this._modelContractRepository.getByClassification(type);
        const respondeAssociation = await this._associationRepository.getById(respondseBids.association.association._id);
        const responseProposal = await this._proposalRepository.listByBid(_id);
        if (responseProposal) {
            for (let p = 0; p < responseProposal.length; p++) {
                if (p == 0) {
                    propostas.push(" empresa " +
                        responseProposal[p].proposedBy.name +
                        ", inscrita no cnpj " +
                        responseProposal[p].proposedBy.document +
                        " ");
                }
                else {
                    propostas.push(", empresa " +
                        responseProposal[p].proposedBy.name +
                        ", inscrita no cnpj " +
                        responseProposal[p].proposedBy.document +
                        " ");
                }
            }
        }
        if (respondseBids.invited_suppliers.length > 0) {
            for (let q = 0; q < respondseBids.invited_suppliers.length; q++) {
                const suppliers = await this._supplierRepository.listById(respondseBids.invited_suppliers[q]._id.toString());
                if (q == 0) {
                    convidados.push(" empresa " +
                        suppliers.name +
                        ", inscrita no cnpj " +
                        suppliers.cpf +
                        " ");
                }
                else {
                    convidados.push(" , empresa " +
                        suppliers.name +
                        ", inscrita no cnpj " +
                        suppliers.cpf +
                        " ");
                }
            }
        }
        for (let l = 0; l < respondseBids.add_allotment.length; l++) {
            if (l == 0) {
                lotes.push("lote " + respondseBids.add_allotment[l].allotment_name + " ");
                for (let item of respondseBids.add_allotment[l].add_item) {
                    lotes.push("item " +
                        item.item +
                        " grupo " +
                        item.group +
                        " quantidade " +
                        item.quantity);
                }
            }
            else {
                lotes.push("lote " + respondseBids.add_allotment[l].allotment_name + " ");
                for (let item of respondseBids.add_allotment[l].add_item) {
                    lotes.push("item " +
                        item.item +
                        " grupo " +
                        item.group +
                        " quantidade " +
                        item.quantity);
                }
            }
        }
        let contractFormated = modelResponse.contract
            .replace(/\[association_name\]/g, "" + respondeAssociation.name + "")
            .replace(/\[association_name\]/g, respondeAssociation.name)
            .replace(/\[association_id\]/g, "" + this.formatCNPJ(respondeAssociation.cnpj) + " ")
            .replace(/\[association_zip_code\]/g, "" + respondeAssociation.address.zipCode + " ")
            .replace(/\[association_address\]/g, "" +
            respondeAssociation.address.publicPlace +
            " " +
            respondeAssociation.address.number +
            " " +
            respondeAssociation.address.neighborhood +
            " " +
            respondeAssociation.address.complement +
            " ")
            .replace(/\[association_municipality\]/g, "" + respondeAssociation.address.city + "")
            .replace(/\[association_state\]/g, "" + respondeAssociation.address.state + " ")
            .replace(/\[association_legal_representative_name\]/g, "" + respondeAssociation.legalRepresentative.name + " ")
            .replace(/\[association_legal_representative_id\]/g, "" + respondeAssociation.legalRepresentative.cpf + " ")
            .replace(/\[association_legal_representative_address\]/g, "" +
            respondeAssociation.legalRepresentative.address.publicPlace +
            " " +
            respondeAssociation.legalRepresentative.address.number +
            " " +
            respondeAssociation.legalRepresentative.address.neighborhood +
            " " +
            respondeAssociation.legalRepresentative.address.complement +
            " ")
            .replace(/\[association_legal_representative_supplier_municipality\]/g, "" + respondeAssociation.legalRepresentative.address.city + " ")
            .replace(/\[association_legal_representative_supplier_state\]/g, "" + respondeAssociation.legalRepresentative.address.state + " ")
            .replace("[association_name]", "" + respondeAssociation.name + "")
            .replace("[association_id]", "" + respondeAssociation.cnpj + " ")
            .replace("[association_zip_code]", "" + respondeAssociation.address.zipCode + " ")
            .replace("[association_address]", "" +
            respondeAssociation.address.publicPlace +
            " " +
            respondeAssociation.address.number +
            " " +
            respondeAssociation.address.neighborhood +
            " " +
            respondeAssociation.address.complement +
            " ")
            .replace("[association_municipality]", "" + respondeAssociation.address.city + "")
            .replace("[association_state]", "" + respondeAssociation.address.state + " ")
            .replace("[association_legal_representative_name]", "" + respondeAssociation.legalRepresentative.name + " ")
            .replace("[association_legal_representative_id]", "" + respondeAssociation.legalRepresentative.cpf + " ")
            .replace("[association_legal_representative_address]", "" +
            respondeAssociation.legalRepresentative.address.publicPlace +
            " " +
            respondeAssociation.legalRepresentative.address.number +
            " " +
            respondeAssociation.legalRepresentative.address.neighborhood +
            " " +
            respondeAssociation.legalRepresentative.address.complement +
            " ")
            .replace("[association_legal_representative_supplier_municipality]", "" + respondeAssociation.legalRepresentative.address.city + " ")
            .replace("[association_legal_representative_supplier_state]", "" + respondeAssociation.legalRepresentative.address.state + " ")
            .replace(/\[covenant_number\]/g, " " + respondseBids.agreement.register_number.toString() + " ")
            .replace(/\[covenant_object\]/g, " " + respondseBids.agreement.register_object.toString() + " ")
            .replace(/\[municipality_execution_covenant\]/g, " " + respondseBids.local_to_delivery.toString() + " ")
            .replace("[number/year_bidding]", " " +
            respondseBids.bid_count.toString() +
            "/" +
            moment(respondseBids.start_at).format("YYYY").toString())
            .replace("[guest_supplier]", "" + convidados + " ")
            .replace("[proposed_list]", " " + propostas)
            .replace("[document_minutes]", " " + moment(respondseBids.start_at).format("DD/MM/YYYY").toString())
            .replace("[document_notice_ date]", " " + moment(respondseBids.start_at).format("DD/MM/YYYY").toString())
            .replace("[batch_list]", "" + lotes + " ");
        return contractFormated;
    }
    async createDocument(_id, lang = language_contract_enum_1.LanguageContractEnum.english, type) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const modelContract = await this._modelContractRepository.getByContractAndLanguage(lang, type);
        if (!modelContract)
            throw new Error("Modelo de documento não encontrado");
        const content = fs.readFileSync(path.resolve("src/shared/documents", modelContract.contract), "binary");
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        const bid = await this._bidsRepository.getById(_id);
        const contractArray = await this._contractRepository.getByBidId(_id);
        const proposalArray = await this._proposalRepository.listByBid(_id);
        const contract = contractArray ? contractArray[0] : null;
        let allotment = [];
        bid.add_allotment.forEach((allot) => {
            allotment.push(allot);
        });
        let listOfItems = [];
        listOfItems = await this.costItensGet(allotment, proposalArray);
        const estimatedValue = (contract === null || contract === void 0 ? void 0 : contract.value) ||
            ((_a = bid.agreement.workPlan) === null || _a === void 0 ? void 0 : _a.reduce((a, b) => {
                var _a;
                return a +
                    ((_a = b.product) === null || _a === void 0 ? void 0 : _a.reduce((acc, curr) => acc + Number(curr.quantity) * curr.unitValue, 0));
            }, 0)) ||
            0;
        let signature = "Assinado eletronicamente pela: ";
        let yes = "Sim";
        let no = "Não";
        switch (lang) {
            case language_contract_enum_1.LanguageContractEnum.english:
                signature = "Electronically signed by: ";
                yes = "Yes";
                no = "No";
                break;
            case language_contract_enum_1.LanguageContractEnum.spanish:
                signature = "Firmado electrónicamente por: ";
                yes = "Sí";
                no = "No";
                break;
            case language_contract_enum_1.LanguageContractEnum.portuguese:
                signature = "Assinado eletronicamente pela: ";
                yes = "Sim";
                no = "Não";
                break;
            case language_contract_enum_1.LanguageContractEnum.french:
                signature = "Signé électroniquement par: ";
                yes = "Oui";
                no = "Non";
                break;
            default:
                break;
        }
        const formatDateString = lang === language_contract_enum_1.LanguageContractEnum.english ? "MM/DD/YYYY" : "DD/MM/YYYY";
        let listOfBidPrices = [];
        if (proposalArray)
            proposalArray
                .sort((a, b) => Number((a === null || a === void 0 ? void 0 : a.total_value) || 0) - Number((b === null || b === void 0 ? void 0 : b.total_value) || 0))
                .forEach((proposal) => {
                listOfBidPrices.push({
                    lot: proposal.allotment
                        .map((allot) => allot.allotment_name)
                        .join(", "),
                    rank: listOfBidPrices.length + 1,
                    bidders_name: proposal.proposedBy.supplier.name || "",
                    didders_id: proposal._id.toString(),
                    bid_price: (proposal === null || proposal === void 0 ? void 0 : proposal.total_value) || 0,
                    submited_at: moment(proposal.createdAt).format(formatDateString),
                    accepted: proposal.association_accept && proposal.reviewer_accept
                        ? yes
                        : no,
                    justification_for_rejection: proposal.refusedBecaused || "",
                    awarded_at: proposal.association_accept && proposal.reviewer_accept
                        ? moment(proposal.acceptedRevisorAt).format(formatDateString)
                        : "",
                    number_contract: (contract === null || contract === void 0 ? void 0 : contract.contract_number) +
                        "/" +
                        moment(contract === null || contract === void 0 ? void 0 : contract.createdAt).format("YYYY"),
                });
            });
        doc.render({
            process_description: bid.description,
            bid_number: bid.bid_count + "/" + moment(bid.start_at).format("YYYY"),
            name_project: (contract === null || contract === void 0 ? void 0 : contract.contract_document) || "",
            name_purchaser: bid.association.association.name,
            purchaser_country: bid.association.association.address.state,
            publication_date: moment(bid.createdAt).format(formatDateString),
            list_of_items: listOfItems,
            list_of_bid_prices: listOfBidPrices,
            bid_opening_date: moment(bid.start_at).format(formatDateString),
            email_purchaser: bid.association.email,
            deadline_date: bid.end_at
                ? moment(bid.end_at).format(formatDateString)
                : "| A definir no momento da abertura da licitação |",
            website_url: bid.aditional_site || "Sem site adicional",
            day_contract: moment(bid.createdAt).format("DD"),
            month_contract: moment(bid.createdAt).format("MM"),
            year_contract: moment(bid.createdAt).format("YYYY"),
            date_contract: moment(bid.createdAt).format(formatDateString),
            number_contract: (contract === null || contract === void 0 ? void 0 : contract.contract_number) +
                "/" +
                moment((contract === null || contract === void 0 ? void 0 : contract.createdAt) || bid.createdAt).format("YYYY"),
            adress_purchaser: bid.association.association.address.publicPlace +
                ", " +
                bid.association.association.address.number +
                ", " +
                bid.association.association.address.complement +
                ", " +
                bid.association.association.address.city +
                ", " +
                bid.association.association.address.state +
                ", " +
                bid.association.association.address.zipCode,
            name_legal_representative_purchaser: bid.association.association.legalRepresentative.name,
            name_supplier: ((_b = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _b === void 0 ? void 0 : _b.name) || "Não tem fornecedor",
            supplier_country: ((_c = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _c === void 0 ? void 0 : _c.address.state) || "Não tem fornecedor",
            adress_supplier: (contract === null || contract === void 0 ? void 0 : contract.supplier_id)
                ? ((_d = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _d === void 0 ? void 0 : _d.address.publicPlace) +
                    ", " +
                    ((_e = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _e === void 0 ? void 0 : _e.address.number) +
                    ", " +
                    ((_f = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _f === void 0 ? void 0 : _f.address.complement) +
                    ", " +
                    ((_g = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _g === void 0 ? void 0 : _g.address.city) +
                    ", " +
                    ((_h = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _h === void 0 ? void 0 : _h.address.state) +
                    ", " +
                    ((_j = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _j === void 0 ? void 0 : _j.address.zipCode)
                : "Não tem fornecedor",
            name_legal_representative_supplier: ((_k = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _k === void 0 ? void 0 : _k.legal_representative.name) ||
                "Não tem fornecedor",
            purchaser_cnpj: bid.association.association.cnpj,
            supplier_cnpj: ((_l = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _l === void 0 ? void 0 : _l.cpf) || "Não tem fornecedor",
            delivery_place: bid.local_to_delivery,
            supplier_email: ((_m = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _m === void 0 ? void 0 : _m.name) || "Não tem fornecedor",
            days_to_delivery: bid.days_to_delivery,
            date_to_delivery: moment()
                .add(bid.days_to_delivery, "days")
                .format(formatDateString),
            role_purchaser: "",
            role_supplier: "",
            contract_value: estimatedValue,
            batch_list_name: listOfItems.map((item) => item.name).toString(),
            agreement_name: bid.agreement.register_number + "/" + bid.agreement.register_object,
            bid_status: bid.status,
            bid_concluded_date: bid.concludedAt
                ? moment(bid.concludedAt).format(formatDateString)
                : "",
            guest_suppliers: bid.invited_suppliers
                .map((supplier) => supplier.name)
                .toString(),
            winning_supplier: listOfBidPrices.length
                ? listOfBidPrices[0].bidders_name
                : "",
            estimated_value: (listOfItems === null || listOfItems === void 0 ? void 0 : listOfItems.reduce((acc, item) => acc + Number((item === null || item === void 0 ? void 0 : item.total_value) || 0), 0)) || 0,
            list_of_supplier: contractArray.map((contract) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                return {
                    supplier_email: ((_a = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _a === void 0 ? void 0 : _a.name) || "Não tem email fornecido",
                    supplier_cnpj: ((_b = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _b === void 0 ? void 0 : _b.cpf) || "Não tem cnpj fornecido",
                    adress_supplier: (contract === null || contract === void 0 ? void 0 : contract.supplier_id)
                        ? ((_c = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _c === void 0 ? void 0 : _c.address.publicPlace) +
                            ", " +
                            ((_d = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _d === void 0 ? void 0 : _d.address.number) +
                            ", " +
                            ((_e = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _e === void 0 ? void 0 : _e.address.complement) +
                            ", " +
                            ((_f = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _f === void 0 ? void 0 : _f.address.city) +
                            ", " +
                            ((_g = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _g === void 0 ? void 0 : _g.address.state) +
                            ", " +
                            ((_h = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _h === void 0 ? void 0 : _h.address.zipCode)
                        : "Não tem endereço fornecido",
                    supplier_country: ((_j = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _j === void 0 ? void 0 : _j.address.state) || "Não tem pais fornecido",
                    name_supplier: ((_k = contract === null || contract === void 0 ? void 0 : contract.supplier_id) === null || _k === void 0 ? void 0 : _k.name) || "Não tem nome fornecido",
                };
            }),
        });
        const buf = doc.getZip().generate({ type: "nodebuffer" });
        await fs.writeFileSync(path.resolve("src/shared/documents", "output.docx"), buf);
        await this.callPythonFile()
            .then(async () => {
            fs.unlinkSync(path.resolve("src/shared/documents", "output.docx"));
            return;
        })
            .catch((err) => {
            console.log(err);
            throw new common_1.BadRequestException("Erro ao converter o arquivo, verifique se o python está instalado e se o caminho está correto");
        });
    }
    async costItensGet(allotment, proposal) {
        let listOfItems = [];
        for (let allot of allotment) {
            let el = proposal.find((proposal) => proposal.allotment.find((all) => all._id.toString() === allot._id.toString()));
            let price = 0;
            let quantity = 0;
            if (el) {
                price = +(el === null || el === void 0 ? void 0 : el.total_value) || 0;
                quantity = +el.allotment
                    .map((all) => all.quantity)
                    .reduce((a, b) => Number(a) + Number(b), 0)
                    .toFixed(2);
                price = +Number(price / quantity).toFixed(2);
            }
            for (let item of allot.add_item) {
                const costItems = await this.itemsModel.getByName(item.item);
                listOfItems.push({
                    code: costItems.code,
                    name: item.item,
                    classification: (costItems === null || costItems === void 0 ? void 0 : costItems.group.segment) || "Sem classificação",
                    specification: item.specification || "Sem especificação",
                    quantity: item.quantity,
                    unit_measure: item.unitMeasure,
                    place_to_delivery: allot.place_to_delivery,
                    days_to_delivery: allot.days_to_delivery,
                    price_unit: price,
                    total_value: price * quantity,
                });
            }
        }
        return listOfItems;
    }
    async callPythonFile() {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(path.resolve("src/shared/documents", "output.docx"))) {
                reject("Arquivo não encontrado");
            }
            const py = node_process_1.platform === "win32" ? "python" : "python3";
            const soft = node_process_1.platform === "win32" ? "win32" : "linux";
            const python = spawn(py, [
                path.resolve("src/shared/documents", "convertPDF.py"),
                path.resolve("src/shared/documents", "output.docx"),
                path.resolve("src/shared/documents", "output.pdf"),
                soft,
            ]);
            python.stdout.on("data", (data) => {
                console.log(`stdout: ${data}`);
            });
            python.stderr.on("data", (data) => {
                console.error(`stderr: ${data}`);
            });
            python.on("close", (code) => {
                console.log(`child process exited with code ${code}`);
                if (code === 0) {
                    return resolve(0);
                }
                return reject(1);
            });
            python.on("error", (err) => {
                console.error(err);
                reject(err);
            });
        });
    }
    async report() {
        var _a, e_1, _b, _c;
        const bids = await this._bidsRepository.list();
        const bidsByStatus = bids.reduce((acc, bid) => {
            if (!acc[bid.status]) {
                acc[bid.status] = [];
            }
            acc[bid.status].push(bid);
            return acc;
        }, {});
        const bidsByStatusArray = Object.keys(bidsByStatus).map((key) => {
            return {
                status: key,
                quantity: bidsByStatus[key].length || 0,
                value: 0,
            };
        });
        try {
            for (var _d = true, bidsByStatusArray_1 = __asyncValues(bidsByStatusArray), bidsByStatusArray_1_1; bidsByStatusArray_1_1 = await bidsByStatusArray_1.next(), _a = bidsByStatusArray_1_1.done, !_a;) {
                _c = bidsByStatusArray_1_1.value;
                _d = false;
                try {
                    let bid = _c;
                    if (bid.status === bid_status_enum_1.BidStatusEnum.open ||
                        bid.status === bid_status_enum_1.BidStatusEnum.tiebreaker ||
                        bid.status === bid_status_enum_1.BidStatusEnum.reopened) {
                        const bids = bidsByStatus[bid.status];
                        const proposals = await this._proposalRepository.listBiBidsIds(bids.map((bid) => bid._id.toString()));
                        bid["value"] =
                            ((proposals === null || proposals === void 0 ? void 0 : proposals.reduce((acc, proposal) => acc + +proposal.total_value, 0)) || 0) / ((proposals === null || proposals === void 0 ? void 0 : proposals.length) || 1);
                        continue;
                    }
                    if (bid.status === bid_status_enum_1.BidStatusEnum.completed) {
                        const bids = bidsByStatus[bid.status];
                        const contracts = await this._contractRepository.listByBidIds(bids.map((bid) => bid._id.toString()));
                        bid["value"] =
                            contracts.reduce((acc, contract) => acc + +contract.value, 0) /
                                contracts.length;
                        continue;
                    }
                    const bids = bidsByStatus[bid.status];
                    bids.forEach((x) => {
                        var _a;
                        bid["value"] =
                            ((_a = x.agreement.workPlan) === null || _a === void 0 ? void 0 : _a.reduce((acc, curr) => {
                                var _a;
                                return acc +
                                    ((_a = curr.product) === null || _a === void 0 ? void 0 : _a.reduce((acc2, curr2) => acc2 + curr2.unitValue * Number(curr2.quantity), 0));
                            }, 0)) || 0;
                    });
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = bidsByStatusArray_1.return)) await _b.call(bidsByStatusArray_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return bidsByStatusArray;
    }
    createData(dto) {
        const data = {
            bidId: dto._id.toHexString(),
            description: dto.description,
            agreement: dto.agreement._id.toHexString(),
            classification: dto.classification,
            bid_type: dto.bid_type,
            state: dto.state,
            city: dto.city,
            association: dto.association._id.toHexString(),
            status: dto.status,
        };
        return data;
    }
    calculateHash(data) {
        return "0x" + (0, crypto_js_1.SHA256)(JSON.stringify(data)).toString(crypto_js_1.enc.Hex);
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BidService.prototype, "handleCron", null);
BidService = BidService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bid_repository_1.BidRepository,
        user_repository_1.UserRepository,
        allotment_repository_1.AllotmentRepository,
        notification_service_1.NotificationService,
        agreement_service_1.AgreementService,
        file_repository_1.FileRepository,
        supplier_service_1.SupplierService,
        proposal_repository_1.ProposalRepository,
        contract_repository_1.ContractRepository,
        model_contract_repository_1.ModelContractRepository,
        association_repository_1.AssociationRepository,
        supplier_repository_1.SupplierRepository,
        plataform_repository_1.PlataformRepository,
        cost_items_service_1.CostItemsService,
        registry_service_1.RegistryService,
        config_1.ConfigService,
        project_service_1.ProjectService,
        lacchain_model_1.LacchainModel,
        bid_model_1.MyBidModel,
        bid_history_model_1.BidHistoryModel,
        items_model_1.ItemsModel])
], BidService);
exports.BidService = BidService;
//# sourceMappingURL=bid.service.js.map