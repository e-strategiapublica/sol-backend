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
exports.BidController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const user_controller_1 = require("./user.controller");
const bid_register_request_dto_1 = require("../dtos/bid-register-request.dto");
const bid_service_1 = require("../services/bid.service");
const bid_update_request_dto_1 = require("../dtos/bid-update-request.dto");
const bid_update_status_request_dto_1 = require("../dtos/bid-update-status-request.dto");
const funcoes_guard_1 = require("../../../shared/guards/funcoes.guard");
const function_decorator_1 = require("../../../shared/decorators/function.decorator");
const user_type_enum_1 = require("../enums/user-type.enum");
const bid_add_proposal_dto_1 = require("../dtos/bid-add-proposal.dto");
const platform_express_1 = require("@nestjs/platform-express");
const bid_date_update_dto_1 = require("../dtos/bid-date-update.dto");
const lacchain_model_1 = require("../models/blockchain/lacchain.model");
const bid_history_model_1 = require("../models/database/bid_history.model");
const error_manager_1 = require("../../../shared/utils/error.manager");
const config_1 = require("@nestjs/config");
const path = require("path");
const fs = require("fs");
const enviroment_variables_enum_1 = require("../../../shared/enums/enviroment.variables.enum");
let BidController = class BidController {
    constructor(bidsService, _lacchainModel, _bidHistoryModel, configService) {
        this.bidsService = bidsService;
        this._lacchainModel = _lacchainModel;
        this._bidHistoryModel = _bidHistoryModel;
        this.configService = configService;
        this.logger = new common_1.Logger(user_controller_1.UserController.name);
    }
    async register(request, dto, files, authorizationHeader) {
        try {
            const [bearer, token] = authorizationHeader.split(" ");
            const payload = request.user;
            const response = await this.bidsService.register(token, payload.userId, dto, files);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async list() {
        try {
            const response = await this.bidsService.list();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async listForSupplier(request) {
        try {
            const payload = request.user;
            const response = await this.bidsService.listForSupplier(payload.userId);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async listForProposalSupplier(request) {
        try {
            const payload = request.user;
            const response = await this.bidsService.listForProposalSupplier(payload.userId);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getById(_id) {
        try {
            const response = await this.bidsService.getById(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async listAllotmentBydBidId(_id) {
        try {
            const response = await this.bidsService.listAllotmentBydBidId(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getByManagerOrRevieweId(_id) {
        try {
            const response = await this.bidsService.findAgreementByReviewerOrManagerId(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAgreementByReviewerId(_id) {
        try {
            const response = await this.bidsService.findAgreementByReviewerId(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAgreementByViewerId(_id) {
        try {
            const response = await this.bidsService.findAgreementByViewerId(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAgreementByProjectManagerId(_id) {
        try {
            const response = await this.bidsService.findAgreementByProjectManagerId(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async listBydAssociation(request) {
        try {
            const payload = request.user;
            const response = await this.bidsService.listByAssociation(payload.userId);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateById(_id, dto) {
        try {
            const response = await this.bidsService.update(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateOpenDate(_id, dto) {
        try {
            const response = await this.bidsService.updateOpenDate(dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateStatus(_id, dto, request, authorizationHeader) {
        try {
            const [bearer, token] = authorizationHeader.split(" ");
            const payload = request.user;
            const response = await this.bidsService.updateStatus(token, payload.userId, _id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addProposal(_id, dto) {
        try {
            const response = await this.bidsService.addProposal(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteById(_id) {
        try {
            const result = await this.bidsService.deleteById(_id);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async download(response, id, type) {
        try {
            const result = await this.bidsService.downloadFile(id, type);
            response.send(result);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async bidPdf(id, type) {
        try {
            const result = await this.bidsService.bidPdfDownload(id, type);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createDocument(_id, language, type, res) {
        try {
            await this.bidsService.createDocument(_id, language, type);
            res.sendFile(path.resolve("src/shared/documents", "output.pdf"), {}, (err) => {
                if (err) {
                    throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [err.message]), common_1.HttpStatus.BAD_REQUEST);
                }
                fs.unlinkSync(path.resolve("src/shared/documents", "output.pdf"));
            });
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async report(id) {
        try {
            const response = await this.bidsService.report();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getBidData(request, bidId) {
        try {
            const bidsHistory = await this._bidHistoryModel.listByBidId(bidId);
            let hash;
            let res, fieldSaved;
            if (bidsHistory.length > 0) {
                for (let i = 0; i < bidsHistory.length; i++) {
                    hash = await this.bidsService.calculateHash(bidsHistory[i].data);
                    const sendToBlockchain = this.configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.BLOCKCHAIN_ACTIVE);
                    if (sendToBlockchain && sendToBlockchain == 'true') {
                        res = await this._lacchainModel.getBidData(bidsHistory[i]._id.toHexString());
                    }
                    bidsHistory[i].hash = hash;
                    if (!res) {
                        bidsHistory[i].verifiedByLacchain = { result: false, hash: "" };
                    }
                    else if (res[0] == true) {
                        if (hash == res[1]) {
                            bidsHistory[i].verifiedByLacchain = {
                                result: true,
                                hash: res[1],
                            };
                        }
                        else {
                            bidsHistory[i].verifiedByLacchain = {
                                result: false,
                                hash: res[1],
                            };
                        }
                    }
                    else {
                        bidsHistory[i].verifiedByLacchain = { result: false, hash: res[1] };
                    }
                }
            }
            else {
                return { type: "error", message: "A licitação existe" };
            }
            return bidsHistory;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
    }
};
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({ limits: { fieldSize: 50 * 1024 * 1024 } })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bid_register_request_dto_1.BideRegisterDto,
        Array, String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "register", null);
__decorate([
    (0, common_1.Get)("list"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BidController.prototype, "list", null);
__decorate([
    (0, common_1.Get)("list-for-supplier"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "listForSupplier", null);
__decorate([
    (0, common_1.Get)("list-for-proposal-supplier"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "listForProposalSupplier", null);
__decorate([
    (0, common_1.Get)("get-by-id/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("list-allotment-by/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "listAllotmentBydBidId", null);
__decorate([
    (0, common_1.Get)("list-bid-by-manager-reviewer/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "getByManagerOrRevieweId", null);
__decorate([
    (0, common_1.Get)("list-bid-by-reviewer/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "findAgreementByReviewerId", null);
__decorate([
    (0, common_1.Get)("list-bid-by-viewer/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "findAgreementByViewerId", null);
__decorate([
    (0, common_1.Get)("list-bid-by-manager/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "findAgreementByProjectManagerId", null);
__decorate([
    (0, common_1.Get)("list-by-association"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "listBydAssociation", null);
__decorate([
    (0, common_1.Put)("update/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bid_update_request_dto_1.BidUpdateDto]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "updateById", null);
__decorate([
    (0, common_1.Put)("update-open-date/"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bid_date_update_dto_1.BidDateUpdateDto]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "updateOpenDate", null);
__decorate([
    (0, common_1.Put)("change-status/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bid_update_status_request_dto_1.BidUpdateStatusRequestDto, Object, String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)("add-proposal/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bid_add_proposal_dto_1.BidAddProposalDto]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "addProposal", null);
__decorate([
    (0, common_1.Delete)("delete-by-id/:_id"),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Get)("download/:id/:type"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Param)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "download", null);
__decorate([
    (0, common_1.Get)("bid-pdf/:id/:type"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "bidPdf", null);
__decorate([
    (0, common_1.Get)("create-document/:_id/:language/:type"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)("_id")),
    __param(1, (0, common_1.Param)("language")),
    __param(2, (0, common_1.Param)("type")),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "createDocument", null);
__decorate([
    (0, common_1.Get)("report"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "report", null);
__decorate([
    (0, common_1.Get)("lacchain/getBidData/:bidId"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("bidId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "getBidData", null);
BidController = __decorate([
    (0, swagger_1.ApiTags)("bid"),
    (0, common_1.Controller)("bid"),
    __metadata("design:paramtypes", [bid_service_1.BidService,
        lacchain_model_1.LacchainModel,
        bid_history_model_1.BidHistoryModel,
        config_1.ConfigService])
], BidController);
exports.BidController = BidController;
//# sourceMappingURL=bid.controller.js.map