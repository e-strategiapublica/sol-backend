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
exports.PlataformController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const user_controller_1 = require("./user.controller");
const funcoes_guard_1 = require("../../../shared/guards/funcoes.guard");
const function_decorator_1 = require("../../../shared/decorators/function.decorator");
const user_type_enum_1 = require("../enums/user-type.enum");
const bid_date_update_dto_1 = require("../dtos/bid-date-update.dto");
const plataform_service_1 = require("../services/plataform.service");
let PlataformController = class PlataformController {
    constructor(plataformService) {
        this.plataformService = plataformService;
        this.logger = new common_1.Logger(user_controller_1.UserController.name);
    }
    async register(dto) {
        try {
            const response = await this.plataformService.register(dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async list() {
        try {
            const response = await this.plataformService.findOne();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateById(_id, dto) {
        try {
            const response = await this.plataformService.update(_id, dto);
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
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bid_date_update_dto_1.BidDateUpdateDto]),
    __metadata("design:returntype", Promise)
], PlataformController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlataformController.prototype, "list", null);
__decorate([
    (0, common_1.Put)('update/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bid_date_update_dto_1.BidDateUpdateDto]),
    __metadata("design:returntype", Promise)
], PlataformController.prototype, "updateById", null);
PlataformController = __decorate([
    (0, swagger_1.ApiTags)('plataform'),
    (0, common_1.Controller)('plataform'),
    __metadata("design:paramtypes", [plataform_service_1.PlataformService])
], PlataformController);
exports.PlataformController = PlataformController;
//# sourceMappingURL=plataform.controller.js.map