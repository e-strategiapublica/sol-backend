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
exports.TfaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const validator_interceptor_1 = require("../../../shared/interceptors/validator.interceptor");
const authenticate_responsedto_1 = require("../dtos/authenticate-responsedto");
const tfa_delete_request_dto_1 = require("../dtos/tfa-delete-request.dto");
const tfa_register_request_dto_1 = require("../dtos/tfa-register-request.dto");
const tfa_verify_auth_request_dto_1 = require("../dtos/tfa-verify-auth-request.dto");
const tfa_verify_request_dto_1 = require("../dtos/tfa-verify-request.dto");
const user_repository_1 = require("../repositories/user.repository");
const authentication_service_1 = require("../services/authentication.service");
const tfa_service_1 = require("../services/tfa.service");
const tfa_register_validator_1 = require("../validators/tfa-register.validator");
const tfa_verify_auth_validator_1 = require("../validators/tfa-verify-auth.validator");
const tfa_verify_validator_1 = require("../validators/tfa-verify.validator");
let TfaController = class TfaController {
    constructor(_tfaService, _userRepository, authenticationService) {
        this._tfaService = _tfaService;
        this._userRepository = _userRepository;
        this.authenticationService = authenticationService;
    }
    async get(request) {
        try {
            const payload = request.user;
            const response = await this._tfaService.getByUserId(payload.userId);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async registrar(request, dto) {
        try {
            const payload = request.user;
            dto.userId = payload.userId;
            const result = await this._tfaService.register(dto);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(request, dto) {
        try {
            const payload = request.user;
            dto.userId = payload.userId;
            const isValid = this._tfaService.verify(dto);
            if (!isValid)
                throw new common_1.BadRequestException('Código inválido!');
            const result = await this._tfaService.delete(dto);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verify(dto) {
        try {
            const response = this._tfaService.verify(dto);
            return new response_dto_1.ResponseDto(true, {
                isValid: response,
            }, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyRegistered(request, dto) {
        try {
            const payload = request.user;
            const user = await this._userRepository.getById(payload.userId);
            const isValid = await this._tfaService.verifyAuth(user._id, dto);
            const accessToken = await this.authenticationService.createAccessToken(payload.userId, payload.email, payload.type, true, true);
            const refreshToken = await this.authenticationService.createRefreshToken(payload.userId, payload.email, payload.type, true, true);
            if (isValid) {
                return new response_dto_1.ResponseDto(true, new authenticate_responsedto_1.AuthenticateResponseDto(user.email, user.name, user.id, accessToken.accessToken, refreshToken.accessToken, user.type, user.roles), null);
            }
            else {
                throw new common_1.BadRequestException('Invalid code');
            }
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TfaController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(new validator_interceptor_1.ValidatorInterceptor(new tfa_register_validator_1.TfaRegisterValidator())),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tfa_register_request_dto_1.TfaRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], TfaController.prototype, "registrar", null);
__decorate([
    (0, common_1.Post)('delete'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tfa_delete_request_dto_1.TfaDeleteRequestDto]),
    __metadata("design:returntype", Promise)
], TfaController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(new validator_interceptor_1.ValidatorInterceptor(new tfa_verify_validator_1.TfaVerifyValidator())),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tfa_verify_request_dto_1.TfaVerifyRequestDto]),
    __metadata("design:returntype", Promise)
], TfaController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('verify/auth'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new validator_interceptor_1.ValidatorInterceptor(new tfa_verify_auth_validator_1.TfaVerifyAuthValidator())),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tfa_verify_auth_request_dto_1.TfaVerifyAuthRequestDto]),
    __metadata("design:returntype", Promise)
], TfaController.prototype, "verifyRegistered", null);
TfaController = __decorate([
    (0, swagger_1.ApiTags)('2fa'),
    (0, common_1.Controller)('2fa'),
    __metadata("design:paramtypes", [tfa_service_1.TfaService,
        user_repository_1.UserRepository,
        authentication_service_1.AuthenticationService])
], TfaController);
exports.TfaController = TfaController;
//# sourceMappingURL=tfa.controller.js.map