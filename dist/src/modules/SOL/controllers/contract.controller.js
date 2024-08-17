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
var ContractController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const contract_service_1 = require("../services/contract.service");
const contract_register_request_dto_1 = require("../dtos/contract-register-request.dto");
const contract_update_request_dto_1 = require("../dtos/contract-update-request.dto");
const funcoes_guard_1 = require("../../../shared/guards/funcoes.guard");
const user_type_enum_1 = require("../enums/user-type.enum");
const function_decorator_1 = require("../../../shared/decorators/function.decorator");
const contract_update_status_item_request_dto_1 = require("../dtos/contract-update-status-item-request.dto");
const path = require("path");
const fs = require("fs");
let ContractController = ContractController_1 = class ContractController {
    constructor(contractService) {
        this.contractService = contractService;
        this.logger = new common_1.Logger(ContractController_1.name);
    }
    async register(dto) {
        try {
            const response = await this.contractService.register(dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async list() {
        try {
            const response = await this.contractService.list();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getById(_id) {
        try {
            const response = await this.contractService.getById(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async listByUserId(_id) {
        try {
            const response = await this.contractService.listByUserId(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getByBidId(_id) {
        try {
            const response = await this.contractService.listByBidId(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateStatus(_id, dto) {
        try {
            const response = await this.contractService.updateStatus(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateStatusItens(_id, dto) {
        try {
            const response = await this.contractService.updateStatusItens(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async signAssociation(_id, dto) {
        try {
            const response = await this.contractService.signAssociation(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async contractPdf(_id) {
        try {
            const response = await this.contractService.contractPdfDownload(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async signSupplier(_id, dto) {
        try {
            const response = await this.contractService.signSupplier(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteById(_id) {
        try {
            const result = await this.contractService.deleteById(_id);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createDocument(_id, language, type, res) {
        try {
            await this.contractService.createDocument(_id, language, type);
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
};
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_register_request_dto_1.ContractRegisterDto]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "register", null);
__decorate([
    (0, common_1.Get)("list"),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "list", null);
__decorate([
    (0, common_1.Get)("get-by-id/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("get-by-user-id/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "listByUserId", null);
__decorate([
    (0, common_1.Get)("get-by-bid/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getByBidId", null);
__decorate([
    (0, common_1.Put)("update/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contract_update_request_dto_1.ContractUpdateDto]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)("update-itens/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contract_update_status_item_request_dto_1.ContractUpdateStatusItemDto]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "updateStatusItens", null);
__decorate([
    (0, common_1.Put)("sing-association/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contract_update_request_dto_1.ContractUpdateDto]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "signAssociation", null);
__decorate([
    (0, common_1.Get)("contract-pdf/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.fornecedor),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "contractPdf", null);
__decorate([
    (0, common_1.Put)("sing-supplier/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.fornecedor),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contract_update_request_dto_1.ContractUpdateDto]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "signSupplier", null);
__decorate([
    (0, common_1.Delete)("delete-by-id/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "deleteById", null);
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
], ContractController.prototype, "createDocument", null);
ContractController = ContractController_1 = __decorate([
    (0, swagger_1.ApiTags)("contract"),
    (0, common_1.Controller)("contract"),
    __metadata("design:paramtypes", [contract_service_1.ContractService])
], ContractController);
exports.ContractController = ContractController;
//# sourceMappingURL=contract.controller.js.map