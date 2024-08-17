import { TfaRepository } from '../repositories/tfa.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../repositories/user.repository';
import { AuthenticateRequestDto } from '../dtos/authenticate-request.dto';
import { AuthenticateResponseDto } from '../dtos/authenticate-responsedto';
import { UserModel } from '../models/user.model';
import { UserTypeEnum } from '../enums/user-type.enum';
export declare class AuthenticationService {
    private readonly _jwtService;
    private readonly _userRepository;
    private readonly _configService;
    private readonly _tfaRepository;
    constructor(_jwtService: JwtService, _userRepository: UserRepository, _configService: ConfigService, _tfaRepository: TfaRepository);
    private validate;
    createAccessToken(userId: string, email: string, type: UserTypeEnum, tfaRegistered: boolean, tfaAuthenticate: boolean): {
        accessToken: string;
        expiresIn: any;
    };
    createRefreshToken(userId: string, email: string, type: UserTypeEnum, tfaRegistered: boolean, tfaAuthenticate: boolean): {
        accessToken: string;
        expiresIn: any;
    };
    authenticate(dto: AuthenticateRequestDto): Promise<AuthenticateResponseDto>;
    logoutUser(userId: string): Promise<void>;
    updateRefreshTokenFromUser(user: UserModel, refreshToken: {
        accessToken: string;
        expiresIn: any;
    }): Promise<void>;
}
