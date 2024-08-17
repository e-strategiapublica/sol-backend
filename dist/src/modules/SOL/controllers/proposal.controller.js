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
var ProposalController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const funcoes_guard_1 = require("../../../shared/guards/funcoes.guard");
const user_type_enum_1 = require("../enums/user-type.enum");
const function_decorator_1 = require("../../../shared/decorators/function.decorator");
const proposal_service_1 = require("../services/proposal.service");
const proposal_register_request_dto_1 = require("../dtos/proposal-register-request.dto");
const proposal_addItem_update_dto_1 = require("../dtos/proposal-addItem-update.dto");
const proposal_status_update_request_dto_1 = require("../dtos/proposal-status-update-request.dto");
const proposal_accept_supplier_updatet_dto_1 = require("../dtos/proposal-accept-supplier-updatet.dto");
const proposal_accept_association_updatet_dto_1 = require("../dtos/proposal-accept-association-updatet.dto");
const proposal_refused_request_dto_1 = require("../dtos/proposal-refused-request.dto");
const proposal_update_values_request_dto_1 = require("../dtos/proposal-update-values-request.dto");
const bid_service_1 = require("../services/bid.service");
const proposal_accept_reviewer_update_dto_1 = require("../dtos/proposal-accept-reviewer-update.dto");
let ProposalController = ProposalController_1 = class ProposalController {
    constructor(proposalService, bidService) {
        this.proposalService = proposalService;
        this.bidService = bidService;
        this.logger = new common_1.Logger(ProposalController_1.name);
    }
    async register(dto, request) {
        try {
            const payload = request.user;
            const response = await this.proposalService.register(payload.userId, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async list() {
        try {
            const response = await this.proposalService.list();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getById(_id) {
        try {
            const response = await this.proposalService.getById(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async listProposalByBid(_id) {
        try {
            const response = await this.proposalService.listByBid(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getProposalAcceptedBid(_id) {
        try {
            let response = await this.proposalService.getProposalAcceptByBid(_id);
            if (!response) {
                response = null;
            }
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyProposalByUser(request, _id) {
        try {
            const payload = request.user;
            const response = await this.proposalService.getByUserInBid(payload.userId, _id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateStatus(_id, dto) {
        try {
            const response = await this.proposalService.updateStatus(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateAcceptfromSupplier(_id, dto) {
        try {
            const response = await this.proposalService.updateAcceptfromSupplier(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateAcceptfromAssosiation(_id, dto) {
        try {
            const response = await this.proposalService.updateAcceptAssociation(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateAcceptReviewer(_id, dto, request) {
        try {
            const response = await this.proposalService.updateAcceptReviewer(_id, dto, request.user.userId);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addItemById(_id, dto) {
        try {
            const response = await this.proposalService.addItem(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async removeItemById(_id, dto) {
        try {
            const response = await this.proposalService.removeItem(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteById(_id) {
        try {
            const result = await this.proposalService.deleteById(_id);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async refused(dto, _id, request) {
        try {
            const payload = request.user;
            const response = await this.proposalService.refusedProposal(_id, payload.userId, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async accept(dto, _id, request) {
        try {
            const payload = request.user;
            const response = await this.proposalService.acceptProposal(_id, payload.userId, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateValues(_id, dto) {
        try {
            const response = await this.proposalService.updateValues(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async sendTieBreaker(_id) {
        try {
            const response = await this.bidService.sendTieBreaker(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [proposal_register_request_dto_1.ProposalRegisterDto, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('get-by-id/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('list-proposal-in-bid/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "listProposalByBid", null);
__decorate([
    (0, common_1.Get)('get-proposal-accepted-bid/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "getProposalAcceptedBid", null);
__decorate([
    (0, common_1.Get)('verify-proposal-by-user/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "verifyProposalByUser", null);
__decorate([
    (0, common_1.Put)('status-update/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_status_update_request_dto_1.ProposalStatusUpdateDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)('update-accept-supplier/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_accept_supplier_updatet_dto_1.ProposalSupplierAcceptUpdateDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "updateAcceptfromSupplier", null);
__decorate([
    (0, common_1.Put)('update-accept-association/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_accept_association_updatet_dto_1.ProposalAssociationAcceptUpdateDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "updateAcceptfromAssosiation", null);
__decorate([
    (0, common_1.Put)('update-accept-reviwer/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_accept_reviewer_update_dto_1.ProposalReviewerAcceptUpdateDto, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "updateAcceptReviewer", null);
__decorate([
    (0, common_1.Put)('update/add-item/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_addItem_update_dto_1.ProposalAddItemUpdateDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "addItemById", null);
__decorate([
    (0, common_1.Put)('update/remove-item/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_addItem_update_dto_1.ProposalAddItemUpdateDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "removeItemById", null);
__decorate([
    (0, common_1.Delete)('delete-by-id/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Put)('refuse/:_id'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('_id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [proposal_refused_request_dto_1.ProposalRefusedRequestDto, String, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "refused", null);
__decorate([
    (0, common_1.Put)('accept/:_id'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor, user_type_enum_1.UserTypeEnum.project_manager, user_type_enum_1.UserTypeEnum.associacao),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('_id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "accept", null);
__decorate([
    (0, common_1.Put)('update-values/:id'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_update_values_request_dto_1.ProposalUpdateValues]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "updateValues", null);
__decorate([
    (0, common_1.Post)('send-tie-breaker/:id'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "sendTieBreaker", null);
ProposalController = ProposalController_1 = __decorate([
    (0, swagger_1.ApiTags)('proposal'),
    (0, common_1.Controller)('proposal'),
    __metadata("design:paramtypes", [proposal_service_1.ProposalService,
        bid_service_1.BidService])
], ProposalController);
exports.ProposalController = ProposalController;
//# sourceMappingURL=proposal.controller.js.map