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
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const encrypt_interceptor_1 = require("../../../shared/interceptors/encrypt.interceptor");
const validator_interceptor_1 = require("../../../shared/interceptors/validator.interceptor");
const authenticate_request_dto_1 = require("../dtos/authenticate-request.dto");
const authentication_service_1 = require("../services/authentication.service");
const user_service_1 = require("../services/user.service");
const authenticate_validator_1 = require("../validators/authenticate.validator");
let AuthenticationController = class AuthenticationController {
    constructor(configService, authenticationService, userService) {
        this.configService = configService;
        this.authenticationService = authenticationService;
        this.userService = userService;
    }
    async authenticate(dto) {
        try {
            const result = await this.authenticationService.authenticate(dto);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async logout(request) {
        try {
            const payload = request.user;
            await this.authenticationService.logoutUser(payload.userId);
            return new response_dto_1.ResponseDto(true, null, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async authenticated(request) {
        try {
            const payload = request.user;
            const user = this.userService.getById(payload.userId);
            if (!!!user) {
                throw new common_1.UnauthorizedException('User not found.');
            }
            return new response_dto_1.ResponseDto(true, null, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('/authenticate'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor(), new validator_interceptor_1.ValidatorInterceptor(new authenticate_validator_1.AuthenticateValidator())),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authenticate_request_dto_1.AuthenticateRequestDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "authenticate", null);
__decorate([
    (0, common_1.Post)('/logout'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('/authenticated'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "authenticated", null);
AuthenticationController = __decorate([
    (0, swagger_1.ApiTags)('authentication'),
    (0, common_1.Controller)('authentication'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        authentication_service_1.AuthenticationService,
        user_service_1.UserService])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map