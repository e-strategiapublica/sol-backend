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
var AgreementController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgreementController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const agreement_register_request_dto_1 = require("../dtos/agreement-register-request.dto");
const agreement_service_1 = require("../services/agreement.service");
const funcoes_guard_1 = require("../../../shared/guards/funcoes.guard");
const user_type_enum_1 = require("../enums/user-type.enum");
const function_decorator_1 = require("../../../shared/decorators/function.decorator");
const work_plan_add_work_plan_request_dto_1 = require("../dtos/work-plan-add-work-plan-request.dto");
const user_type_request_dto_1 = require("../dtos/user-type-request.dto");
let AgreementController = AgreementController_1 = class AgreementController {
    constructor(_airdropService) {
        this._airdropService = _airdropService;
        this._logger = new common_1.Logger(AgreementController_1.name);
    }
    async get() {
        try {
            const response = await this._airdropService.findAll();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAgreementsWithOutProject() {
        try {
            const response = await this._airdropService.findAgreementsWithOutProject();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getForAssociation(request) {
        try {
            const payload = request.user;
            const response = await this._airdropService.findForAssociation(payload.userId);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAgreementsWithProjects() {
        try {
            const response = await this._airdropService.getAgreementsWithProjects();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async register(request, dto) {
        try {
            const payload = request.user;
            dto.manager = payload.userId;
            const response = await this._airdropService.register(dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findById(id) {
        try {
            const response = await this._airdropService.findById(id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAgreementByUserId(id, userRoles) {
        try {
            const response = await this._airdropService.findAgreementByUserId(id, userRoles.roles);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteById(id) {
        try {
            const response = await this._airdropService.deleteById(id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, dto) {
        try {
            const response = await this._airdropService.update(id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addWorkPlan(id, dto) {
        try {
            const response = await this._airdropService.addWorkPlan(id, dto.workPlanId);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async removeWorkPlan(id, dto) {
        try {
            const response = await this._airdropService.removeWorkPlan(id, dto.workPlanId);
            return response;
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.project_manager),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgreementController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('without-project'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.project_manager),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgreementController.prototype, "findAgreementsWithOutProject", null);
__decorate([
    (0, common_1.Get)('for-association'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.project_manager),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AgreementController.prototype, "getForAssociation", null);
__decorate([
    (0, common_1.Get)('agreement-with-project'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.project_manager),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgreementController.prototype, "getAgreementsWithProjects", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, agreement_register_request_dto_1.AgreementRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], AgreementController.prototype, "register", null);
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgreementController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)("by-user-id/:id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_type_request_dto_1.UserTypeRequestDto]),
    __metadata("design:returntype", Promise)
], AgreementController.prototype, "findAgreementByUserId", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgreementController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, agreement_register_request_dto_1.AgreementRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], AgreementController.prototype, "update", null);
__decorate([
    (0, common_1.Put)("add-work-plan/:id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, work_plan_add_work_plan_request_dto_1.WorkPlanWorkPlanRequestDto]),
    __metadata("design:returntype", Promise)
], AgreementController.prototype, "addWorkPlan", null);
__decorate([
    (0, common_1.Put)("remove-work-plan/:id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador, user_type_enum_1.UserTypeEnum.associacao, user_type_enum_1.UserTypeEnum.project_manager),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, work_plan_add_work_plan_request_dto_1.WorkPlanWorkPlanRequestDto]),
    __metadata("design:returntype", Promise)
], AgreementController.prototype, "removeWorkPlan", null);
AgreementController = AgreementController_1 = __decorate([
    (0, swagger_1.ApiTags)("conveios"),
    (0, common_1.Controller)("convenios"),
    __metadata("design:paramtypes", [agreement_service_1.AgreementService])
], AgreementController);
exports.AgreementController = AgreementController;
//# sourceMappingURL=agreement.controller.js.map