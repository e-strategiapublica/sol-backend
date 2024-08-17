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
var ModelContractController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelContractController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const funcoes_guard_1 = require("../../../shared/guards/funcoes.guard");
const user_type_enum_1 = require("../enums/user-type.enum");
const function_decorator_1 = require("../../../shared/decorators/function.decorator");
const model_contract_register_request_dto_1 = require("../dtos/model-contract-register-request.dto");
const model_contract_service_1 = require("../services/model-contract.service");
const model_contract_update_request_dto_1 = require("../dtos/model-contract-update-request.dto");
const model_contract_status_enum_1 = require("../enums/model-contract-status.enum");
const bid_service_1 = require("../services/bid.service");
const platform_express_1 = require("@nestjs/platform-express");
let ModelContractController = ModelContractController_1 = class ModelContractController {
    constructor(modelContractService, bidsService) {
        this.modelContractService = modelContractService;
        this.bidsService = bidsService;
        this.logger = new common_1.Logger(ModelContractController_1.name);
    }
    async register(file, dto) {
        try {
            dto.status = model_contract_status_enum_1.ModelContractStatusEnum.ativo;
            const response = await this.modelContractService.register(dto, file);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async list() {
        try {
            const response = await this.modelContractService.list();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getByBidId(_id) {
        try {
            const response = await this.modelContractService.getBidById(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getById(_id) {
        try {
            const response = await this.modelContractService.getById(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateStatus(_id, dto, file) {
        try {
            dto.status = model_contract_status_enum_1.ModelContractStatusEnum.ativo;
            const response = await this.modelContractService.update(_id, dto, file);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteById(_id) {
        try {
            const result = await this.modelContractService.deleteById(_id);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { limits: { fileSize: 22428800 } })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, model_contract_register_request_dto_1.ModelContractRegisterDto]),
    __metadata("design:returntype", Promise)
], ModelContractController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModelContractController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('get-by-Bid/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModelContractController.prototype, "getByBidId", null);
__decorate([
    (0, common_1.Get)('get-by-id/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModelContractController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)('update/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, model_contract_update_request_dto_1.ModelContractUpdateDto, Object]),
    __metadata("design:returntype", Promise)
], ModelContractController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)('delete-by-id/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModelContractController.prototype, "deleteById", null);
ModelContractController = ModelContractController_1 = __decorate([
    (0, swagger_1.ApiTags)('model-contract'),
    (0, common_1.Controller)('model-contract'),
    __metadata("design:paramtypes", [model_contract_service_1.ModelContractService,
        bid_service_1.BidService])
], ModelContractController);
exports.ModelContractController = ModelContractController;
//# sourceMappingURL=model-contract.controller.js.map