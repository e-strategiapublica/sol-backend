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
var EndPointsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndPointsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const endpoints_service_1 = require("../services/endpoints.service");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const endpoints_register_request_dto_1 = require("../dtos/endpoints-register-request.dto");
const endpoints_type_enum_1 = require("../enums/endpoints-type.enum");
let EndPointsController = EndPointsController_1 = class EndPointsController {
    constructor(_endPointsService) {
        this._endPointsService = _endPointsService;
        this._logger = new common_1.Logger(EndPointsController_1.name);
    }
    async list() {
        try {
            const response = await this._endPointsService.listEndpoints();
            return response;
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getById(id) {
        try {
            const response = await this._endPointsService.getEndpointById(id);
            return response;
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(body) {
        try {
            const response = await this._endPointsService.createEndpoint(body);
            return response;
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async jobTest(type) {
        try {
            const response = await this._endPointsService.dynamicJob(endpoints_type_enum_1.EndPointsTypeEnum[type]);
            return { type: "success" };
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, body) {
        try {
            const response = await this._endPointsService.updateEndpoint(id, body);
            return response;
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(id) {
        try {
            const response = await this._endPointsService.deleteEndpointById(id);
            return response;
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EndPointsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('get-by-id/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EndPointsController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [endpoints_register_request_dto_1.EndPointsRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], EndPointsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('force-job/:type'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EndPointsController.prototype, "jobTest", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, endpoints_register_request_dto_1.EndPointsRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], EndPointsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EndPointsController.prototype, "delete", null);
EndPointsController = EndPointsController_1 = __decorate([
    (0, swagger_1.ApiTags)("endpoints"),
    (0, common_1.Controller)("endpoints"),
    __metadata("design:paramtypes", [endpoints_service_1.EndPointsService])
], EndPointsController);
exports.EndPointsController = EndPointsController;
//# sourceMappingURL=endpoints.controller.js.map