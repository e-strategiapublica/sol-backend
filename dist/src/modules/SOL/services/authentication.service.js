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
exports.AuthenticationService = void 0;
const tfa_repository_1 = require("../repositories/tfa.repository");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcryptjs");
const user_repository_1 = require("../repositories/user.repository");
const enviroment_variables_enum_1 = require("../../../shared/enums/enviroment.variables.enum");
const authenticate_responsedto_1 = require("../dtos/authenticate-responsedto");
const user_status_enum_1 = require("../enums/user-status.enum");
let AuthenticationService = class AuthenticationService {
    constructor(_jwtService, _userRepository, _configService, _tfaRepository) {
        this._jwtService = _jwtService;
        this._userRepository = _userRepository;
        this._configService = _configService;
        this._tfaRepository = _tfaRepository;
    }
    async validate(email, password) {
        const user = await this._userRepository.getByEmail(email);
        if (user && (await bcrypt.compare(password, user.password)))
            return user;
        else
            return null;
    }
    createAccessToken(userId, email, type, tfaRegistered, tfaAuthenticate) {
        const user = {
            userId,
            email,
            type,
            tfaRegistered,
            tfaAuthenticate,
        };
        const expiresIn = this._configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.JWT_ACCESS_TOKEN_EXPIRATION);
        const accessToken = this._jwtService.sign(user, {
            expiresIn,
            secret: this._configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.JWT_KEY)
        });
        return { accessToken, expiresIn };
    }
    createRefreshToken(userId, email, type, tfaRegistered, tfaAuthenticate) {
        const user = {
            userId,
            email,
            type,
            tfaRegistered,
            tfaAuthenticate,
        };
        const expiresIn = this._configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.JWT_REFRESH_TOKEN_EXPIRATION);
        const accessToken = this._jwtService.sign(user, {
            expiresIn,
            secret: this._configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.JWT_REFRESH_TOKEN_KEY)
        });
        return { accessToken, expiresIn };
    }
    async authenticate(dto) {
        const userByemail = await this._userRepository.getByEmail(dto.email);
        if (userByemail && userByemail.status == user_status_enum_1.UserStatusEnum.inactive)
            throw new common_1.NotFoundException('Usuário inativo, faça o primeiro acesso!');
        const user = await this.validate(dto.email, dto.password);
        if (!user)
            throw new common_1.NotFoundException('Email ou senha inválido(s)!');
        if (user.status === user_status_enum_1.UserStatusEnum.inactive)
            throw new common_1.UnauthorizedException('Erro ao realizar a autenticação!');
        const tfa = await this._tfaRepository.getByUserId(user._id.toString());
        const accessToken = this.createAccessToken(user._id, user.email, user.type, !!tfa ? true : false, false);
        const refreshToken = this.createRefreshToken(user._id, user.email, user.type, !!tfa ? true : false, false);
        this.updateRefreshTokenFromUser(user, refreshToken);
        return new authenticate_responsedto_1.AuthenticateResponseDto(user.email, user.name, user.id, accessToken.accessToken, refreshToken.accessToken, user.type, user.roles);
    }
    async logoutUser(userId) {
        await this._userRepository.updateRefreshToken(userId, null);
    }
    async updateRefreshTokenFromUser(user, refreshToken) {
        this._userRepository.updateRefreshToken(user._id, await bcrypt.hash(refreshToken.accessToken, 13));
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_repository_1.UserRepository,
        config_1.ConfigService,
        tfa_repository_1.TfaRepository])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map