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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_type_enum_1 = require("../enums/user-type.enum");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const validator_interceptor_1 = require("../../../shared/interceptors/validator.interceptor");
const user_confirmation_register_request_dto_1 = require("../dtos/user-confirmation-register-request.dto");
const user_register_confirmation_code_request_dto_1 = require("../dtos/user-register-confirmation-code-request.dto");
const user_register_password_request_dto_1 = require("../dtos/user-register-password-request.dto");
const user_register_request_dto_1 = require("../dtos/user-register-request.dto");
const user_register_resend_email_request_dto_1 = require("../dtos/user-register-resend-email-request.dto");
const user_reset_password_confirmation_request_dto_1 = require("../dtos/user-reset-password-confirmation-request.dto");
const user_reset_password_request_dto_1 = require("../dtos/user-reset-password-request.dto");
const user_reset_password_resend_email_request_dto_1 = require("../dtos/user-reset-password-resend-email-request.dto");
const user_update_password_request_dto_1 = require("../dtos/user-update-password-request.dto");
const user_update_profile_picture_request_dto_1 = require("../dtos/user-update-profile-picture-request.dto");
const user_update_request_dto_1 = require("../dtos/user-update-request.dto");
const user_repository_1 = require("../repositories/user.repository");
const user_service_1 = require("../services/user.service");
const verification_service_1 = require("../services/verification.service");
const user_register_validator_1 = require("../validators/user-register.validator");
const user_reset_password_confirmation_validator_1 = require("../validators/user-reset-password-confirmation.validator");
const user_reset_password_resend_email_validator_1 = require("../validators/user-reset-password-resend-email.validator");
const user_update_password_validator_1 = require("../validators/user-update-password.validator");
const user_update_validator_1 = require("../validators/user-update.validator");
const user_update_by_id_request_dto_1 = require("../dtos/user-update-by-id-request.dto");
const user_roles_enum_1 = require("../enums/user-roles.enum");
let UserController = UserController_1 = class UserController {
    constructor(userService, userRepository, verificationService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.verificationService = verificationService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async getUser(request) {
        try {
            const payload = request.user;
            const response = await this.userService.getById(payload.userId);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAll() {
        try {
            const response = await this.userService.getAll();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getById(_id) {
        try {
            const response = await this.userService.getById(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUserBySupplierId(_id) {
        try {
            const response = await this.userService.getUserBySupplierId(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async listByType(type) {
        try {
            const response = await this.userService.listByType(type);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async listByRole(role) {
        try {
            const response = await this.userService.listByRole(role);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async register(dto) {
        try {
            const response = await this.userService.register(dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async registerWithoutAuth(dto) {
        try {
            const response = await this.userService.register(dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async confirmRegistrationCode(dto) {
        try {
            const user = await this.userRepository.getByEmail(dto.email);
            const response = await this.verificationService.verifyCode(user, dto.code);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async registerPassword(dto) {
        try {
            const user = await this.userService.getByEmail(dto.email);
            const response = await this.userService.registerPassword(user._id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async confirmationRegisterSend(dto) {
        try {
            if (dto.type === 'email') {
                const user = await this.userService.getByEmail(dto.value);
                let response = await this.verificationService.sendRegister(user);
                return new response_dto_1.ResponseDto(true, response, null);
            }
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async resendCodeRegisterEmail(dto) {
        try {
            const response = await this.verificationService.resendCodeRegisterEmail(dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(_id, dto) {
        try {
            const response = await this.userService.update(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateById(_id, dto) {
        try {
            const response = await this.userService.updateById(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updatePassword(request, dto) {
        try {
            const payload = request.user;
            const response = await this.userService.updatePassword(payload.userId, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async resetPassword(dto) {
        try {
            const user = await this.userService.getByEmail(dto.email);
            const result = await this.verificationService.send(user);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async firstAccess(dto) {
        try {
            const user = await this.userService.getByEmailFirstAccess(dto.email);
            const result = await this.verificationService.sendFirstAcess(user);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async resetPasswordConfirmation(dto) {
        try {
            const response = await this.userService.updatePasswordWithCode(dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(JSON.stringify(error));
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async resetPasswordResendEmail(dto) {
        try {
            const result = await this.verificationService.resendResetPasswordEmail(dto);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateProfilePicture(dto) {
        try {
            const profilePicture = await this.userService.updateProfilePicture(dto.userId, dto.profilePicture);
            return new response_dto_1.ResponseDto(true, profilePicture, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteById(_id) {
        try {
            const result = await this.userService.deleteById(_id);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('get-by-id/:_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('get-users-by-supplier/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserBySupplierId", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'type', enum: user_type_enum_1.UserTypeEnum, description: 'Type of user' }),
    (0, common_1.Get)('list-by-type/:type'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "listByType", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'role', enum: user_roles_enum_1.UserRolesEnum, description: 'role of user' }),
    (0, common_1.Get)('list-by-role/:role'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "listByRole", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new validator_interceptor_1.ValidatorInterceptor(new user_register_validator_1.UserRegisterValidator())),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_register_request_dto_1.UserRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('registerWithoutAuth'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseInterceptors)(new validator_interceptor_1.ValidatorInterceptor(new user_register_validator_1.UserRegisterValidator())),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_register_request_dto_1.UserRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerWithoutAuth", null);
__decorate([
    (0, common_1.Post)('confirm-registration-code'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_register_confirmation_code_request_dto_1.UserRegisterConfirmationCodeRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmRegistrationCode", null);
__decorate([
    (0, common_1.Put)('register-password'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_register_password_request_dto_1.UserRegisterPasswordRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerPassword", null);
__decorate([
    (0, common_1.Post)('confirmation-register-send'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_confirmation_register_request_dto_1.UserConfirmationRegisterSendRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmationRegisterSend", null);
__decorate([
    (0, common_1.Post)('resend-code-register-email'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_register_resend_email_request_dto_1.UserRegisterResendEmailRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resendCodeRegisterEmail", null);
__decorate([
    (0, common_1.Put)('update/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new validator_interceptor_1.ValidatorInterceptor(new user_update_validator_1.UserUpdateValidator())),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_update_request_dto_1.UserUpdateRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('update-by-id/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new validator_interceptor_1.ValidatorInterceptor(new user_update_validator_1.UserUpdateValidator())),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_update_by_id_request_dto_1.UserUpdateByIdRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateById", null);
__decorate([
    (0, common_1.Put)('update-password'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new validator_interceptor_1.ValidatorInterceptor(new user_update_password_validator_1.UserUpdatePasswordValidator())),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_update_password_request_dto_1.UserUpdatePasswordRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_reset_password_request_dto_1.UserResetPasswordRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('first-access'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_reset_password_request_dto_1.UserResetPasswordRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "firstAccess", null);
__decorate([
    (0, common_1.Put)('reset-password-confirmation'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)(new validator_interceptor_1.ValidatorInterceptor(new user_reset_password_confirmation_validator_1.UserResetPasswordConfirmationValidator())),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_reset_password_confirmation_request_dto_1.UserResetPasswordConfirmationRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPasswordConfirmation", null);
__decorate([
    (0, common_1.Post)('reset-password-resend-email'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)(new validator_interceptor_1.ValidatorInterceptor(new user_reset_password_resend_email_validator_1.UserResetPasswordResendEmailValidator())),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_reset_password_resend_email_request_dto_1.UserResetPasswordResendEmailRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPasswordResendEmail", null);
__decorate([
    (0, common_1.Put)('update-profile-picture'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_profile_picture_request_dto_1.UserUpdateProfilePictureRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfilePicture", null);
__decorate([
    (0, common_1.Delete)('delete-by-id/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteById", null);
UserController = UserController_1 = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_repository_1.UserRepository,
        verification_service_1.VerificationService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map