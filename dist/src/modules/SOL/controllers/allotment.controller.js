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
var AllotmentController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllotmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const allotment_service_1 = require("../services/allotment.service");
const item_register_request_dto_1 = require("../dtos/item-register-request.dto");
const allotment_update_status_request_dto_1 = require("../dtos/allotment-update-status-request.dto");
const funcoes_guard_1 = require("../../../shared/guards/funcoes.guard");
const function_decorator_1 = require("../../../shared/decorators/function.decorator");
const user_type_enum_1 = require("../enums/user-type.enum");
let AllotmentController = AllotmentController_1 = class AllotmentController {
    constructor(allotmentService) {
        this.allotmentService = allotmentService;
        this.logger = new common_1.Logger(AllotmentController_1.name);
    }
    async list() {
        try {
            const response = await this.allotmentService.list();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllotById(_id) {
        try {
            const response = await this.allotmentService.listById(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addItem(_id, dto) {
        try {
            const response = await this.allotmentService.updateItem(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateStatus(_id, dto) {
        try {
            const response = await this.allotmentService.updateStatus(_id, dto.status);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async download(_id) {
        try {
            const response = await this.allotmentService.downloadAllotmentById(_id);
            return response;
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)("list"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AllotmentController.prototype, "list", null);
__decorate([
    (0, common_1.Get)("allotment-by-id/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AllotmentController.prototype, "getAllotById", null);
__decorate([
    (0, common_1.Put)("add-item/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_register_request_dto_1.ItemRequestDto]),
    __metadata("design:returntype", Promise)
], AllotmentController.prototype, "addItem", null);
__decorate([
    (0, common_1.Put)("update-status/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, allotment_update_status_request_dto_1.AllotUpdateStatusRequestDto]),
    __metadata("design:returntype", Promise)
], AllotmentController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)("download-file-by-id/:_id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AllotmentController.prototype, "download", null);
AllotmentController = AllotmentController_1 = __decorate([
    (0, swagger_1.ApiTags)("allotment"),
    (0, common_1.Controller)("allotment"),
    __metadata("design:paramtypes", [allotment_service_1.AllotmentService])
], AllotmentController);
exports.AllotmentController = AllotmentController;
//# sourceMappingURL=allotment.controller.js.map