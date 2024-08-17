import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
declare const RefreshTokenStrategy_base: new (...args: any[]) => any;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    readonly configService: ConfigService;
    constructor(configService: ConfigService);
    validate(req: Request, payload: JwtPayload): {
        refreshToken: string;
        userId: string;
        email: string;
        type: import("../../modules/SOL/enums/user-type.enum").UserTypeEnum;
        tfaRegistered: boolean;
        tfaAuthenticate: boolean;
    };
}
export {};
