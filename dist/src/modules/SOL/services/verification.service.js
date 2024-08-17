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
var VerificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationService = void 0;
const common_1 = require("@nestjs/common");
const verification_repository_1 = require("../repositories/verification.repository");
const vertification_register_request_dto_1 = require("../dtos/vertification-register-request.dto");
const email_service_1 = require("../../../shared/services/email.service");
const number_util_1 = require("../../../shared/utils/number.util");
const user_repository_1 = require("../repositories/user.repository");
const vertification_register_response_dto_1 = require("../dtos/vertification-register-response.dto");
const user_reset_password_resend_email_response_dto_1 = require("../dtos/user-reset-password-resend-email-response.dto");
let VerificationService = VerificationService_1 = class VerificationService {
    constructor(emailService, verificationRepository, userRepository) {
        this.emailService = emailService;
        this.verificationRepository = verificationRepository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(VerificationService_1.name);
    }
    async send(user) {
        const userModel = await this.userRepository.getById(user._id);
        let verification = await this.verificationRepository.getByUser(userModel);
        if (verification) {
            const now = new Date();
            if (now < verification.deadline) {
                throw new common_1.UnauthorizedException('Um código já foi enviado e está válido!');
            }
            else {
                await this.verificationRepository.delete(verification._id);
            }
        }
        let deadline = new Date();
        deadline.setMinutes(deadline.getMinutes() + 5);
        const code = number_util_1.default.generateRandomNumber();
        verification = await this.verificationRepository.save(new vertification_register_request_dto_1.VerificationRegisterRequestDto(0, deadline, userModel, code));
        await this.sendVerificationEmail(userModel, 'LACCHAIN - Alteração de senha', `Olá ${user.name}, foi solicitado a alteração de senha!`, `Código: ${verification.code.toString()}`);
        return new vertification_register_response_dto_1.VerificationRegisterResponseDto(userModel.email);
    }
    async sendRegister(user) {
        const userModel = await this.userRepository.getById(user._id);
        let verification = await this.verificationRepository.getByUser(userModel);
        if (verification) {
            const now = new Date();
            if (now < verification.deadline) {
                throw new common_1.UnauthorizedException('Um código já foi enviado e está válido!');
            }
            else {
                await this.verificationRepository.delete(verification._id);
            }
        }
        let deadline = new Date();
        deadline.setMinutes(deadline.getMinutes() + 5);
        const code = number_util_1.default.generateRandomNumber();
        verification = await this.verificationRepository.save(new vertification_register_request_dto_1.VerificationRegisterRequestDto(0, deadline, userModel, code));
        await this.sendVerificationEmail(userModel, 'LACCHAIN - Confirmação de cadastro', `Olá ${user.name},`, `seu codigo para confirmação de cadastro é: ${verification.code.toString()}`);
        return new vertification_register_response_dto_1.VerificationRegisterResponseDto(userModel.email);
    }
    async resendResetPasswordEmail(dto) {
        const userModel = await this.userRepository.getByEmail(dto.email);
        let verification = await this.verificationRepository.getByUser(userModel);
        if (verification) {
            const now = new Date();
            if (now < verification.deadline) {
                throw new common_1.UnauthorizedException('Um email já foi enviado e está válido!');
            }
            else {
                await this.verificationRepository.delete(verification._id);
            }
        }
        let deadline = new Date();
        deadline.setMinutes(deadline.getMinutes() + 5);
        const code = number_util_1.default.generateRandomNumber();
        verification = await this.verificationRepository.save(new vertification_register_request_dto_1.VerificationRegisterRequestDto(0, deadline, userModel, code));
        await this.sendVerificationEmail(userModel, 'INKLUSIVA - Alteração de senha', `Olá ${userModel.name}, foi solicitado a alteração de senha!`, `Código: ${verification.code.toString()}`);
        return new user_reset_password_resend_email_response_dto_1.UserResetPasswordResendEmailResponseDto(verification._id, userModel.email);
    }
    async resendCodeRegisterEmail(dto) {
        const userModel = await this.userRepository.getByEmail(dto.email);
        let verification = await this.verificationRepository.getByUser(userModel);
        if (verification) {
            await this.verificationRepository.delete(verification._id);
        }
        let deadline = new Date();
        deadline.setMinutes(deadline.getMinutes() + 5);
        const code = number_util_1.default.generateRandomNumber();
        verification = await this.verificationRepository.save(new vertification_register_request_dto_1.VerificationRegisterRequestDto(0, deadline, userModel, code));
        await this.sendVerificationEmail(userModel, 'LACCHAIN - Confirmação de cadastro', `Olá ${userModel.name},`, `seu codigo para confirmação de cadastro é: ${verification.code.toString()}`);
        return new user_reset_password_resend_email_response_dto_1.UserResetPasswordResendEmailResponseDto(verification._id, userModel.email);
    }
    async verifyCode(user, code) {
        const verification = await this.verificationRepository.getByUser(user);
        let response;
        if (!verification)
            throw new common_1.NotFoundException('Código expirado!');
        response = false;
        const now = new Date();
        if (now > verification.deadline) {
            await this.verificationRepository.delete(verification._id);
            throw new common_1.UnauthorizedException('Código expirado!');
            response = false;
        }
        if (verification.attempt == 5) {
            await this.verificationRepository.delete(verification._id);
            throw new common_1.UnauthorizedException('Você excedeu o limite de 5 tentativas!');
            response = false;
        }
        if (verification.code != code) {
            this.incrementAttempt(verification._id);
            throw new common_1.UnauthorizedException('Código inválido!');
            response = false;
        }
        await this.verificationRepository.delete(verification._id);
        response = true;
        return response;
    }
    async sendFirstAcess(user) {
        const userModel = await this.userRepository.getById(user._id);
        let verification = await this.verificationRepository.getByUser(userModel);
        if (verification) {
            const now = new Date();
            if (now < verification.deadline) {
                throw new common_1.UnauthorizedException('Um código já foi enviado e está válido!');
            }
            else {
                await this.verificationRepository.delete(verification._id);
            }
        }
        let deadline = new Date();
        deadline.setMinutes(deadline.getMinutes() + 5);
        const code = number_util_1.default.generateRandomNumber();
        verification = await this.verificationRepository.save(new vertification_register_request_dto_1.VerificationRegisterRequestDto(0, deadline, userModel, code));
        await this.sendVerificationEmail(userModel, 'LACCHAIN - Primeiro Acesso', 'LACCHAIN - Primeiro Acesso', `Olá ${user.name}, foi solicitado o código de primeiro acesso! <br> Código: <b>${verification.code.toString()}</b>`);
        return new vertification_register_response_dto_1.VerificationRegisterResponseDto(userModel.email);
    }
    async incrementAttempt(_id) {
        const verification = await this.verificationRepository.getById(_id);
        const attempt = verification.attempt + 1;
        await this.verificationRepository.incrementAttempt(_id, attempt);
    }
    async sendVerificationEmail(user, title, text, html) {
        const verification = await this.verificationRepository.getByUser(user);
        await this.emailService.sendEmail(verification.user.email, title, text, html);
        return verification;
    }
};
VerificationService = VerificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        verification_repository_1.VerificationRepository,
        user_repository_1.UserRepository])
], VerificationService);
exports.VerificationService = VerificationService;
//# sourceMappingURL=verification.service.js.map