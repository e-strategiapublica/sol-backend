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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TfaService = void 0;
const common_1 = require("@nestjs/common");
const tfa_get_response_dto_1 = require("../dtos/tfa-get-response.dto");
const tfa_repository_1 = require("../repositories/tfa.repository");
const user_repository_1 = require("../repositories/user.repository");
const otplib_1 = require("otplib");
const bcrypt = require("bcryptjs");
const user_status_enum_1 = require("../enums/user-status.enum");
const authenticate_responsedto_1 = require("../dtos/authenticate-responsedto");
const authentication_service_1 = require("./authentication.service");
let TfaService = class TfaService {
    constructor(_tfaRepository, _userRepository, authenticationService) {
        this._tfaRepository = _tfaRepository;
        this._userRepository = _userRepository;
        this.authenticationService = authenticationService;
    }
    async getByUserId(userId) {
        const tfa = await this._tfaRepository.getByUserId(userId);
        return new tfa_get_response_dto_1.TfaGetResponseDto(tfa === null || tfa === void 0 ? void 0 : tfa._id, tfa === null || tfa === void 0 ? void 0 : tfa.url, tfa === null || tfa === void 0 ? void 0 : tfa.user._id, tfa === null || tfa === void 0 ? void 0 : tfa.secret);
    }
    async register(dto) {
        const tfa = await this._tfaRepository.getByUserId(dto.userId);
        if (tfa)
            throw new common_1.ForbiddenException('2fa already registered!');
        dto.user = await this._userRepository.getById(dto.userId);
        await this._tfaRepository.save(dto);
        const accessToken = this.authenticationService.createAccessToken(dto.user._id, dto.user.email, dto.user.type, true, true);
        const refreshToken = this.authenticationService.createRefreshToken(dto.user._id, dto.user.email, dto.user.type, true, true);
        return new authenticate_responsedto_1.AuthenticateResponseDto(dto.user.email, dto.user.name, dto.user.id, accessToken.accessToken, refreshToken.accessToken, dto.user.type, dto.user.roles);
    }
    async delete(dto) {
        dto.user = await this._userRepository.getById(dto.userId);
        if (!dto.user)
            throw new common_1.NotFoundException('Email ou senha inválido(s)!');
        if (dto.user.status === user_status_enum_1.UserStatusEnum.inactive)
            throw new common_1.UnauthorizedException('Erro ao realizar a autenticação!');
        if (dto.user && await bcrypt.compare(dto.password, dto.user.password))
            await this._tfaRepository.delete(dto.userId);
        else
            throw new common_1.BadRequestException('Erro ao deletar 2fa!');
        const accessToken = this.authenticationService.createAccessToken(dto.user._id, dto.user.email, dto.user.type, true, true);
        const refreshToken = this.authenticationService.createRefreshToken(dto.user._id, dto.user.email, dto.user.type, true, true);
        return new authenticate_responsedto_1.AuthenticateResponseDto(dto.user.email, dto.user.name, dto.user.id, accessToken.accessToken, refreshToken.accessToken, dto.user.type, dto.user.roles);
    }
    verify(dto) {
        return otplib_1.authenticator.verify({ token: dto.code.toString(), secret: dto.secret });
    }
    async verifyAuth(userId, dto) {
        const tfa = await this._tfaRepository.getByUserId(userId);
        if (!tfa)
            throw new common_1.NotFoundException('2fa not found!');
        return otplib_1.authenticator.verify({ token: dto.code.toString(), secret: tfa.secret });
    }
};
TfaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tfa_repository_1.TfaRepository,
        user_repository_1.UserRepository,
        authentication_service_1.AuthenticationService])
], TfaService);
exports.TfaService = TfaService;
//# sourceMappingURL=tfa.service.js.map