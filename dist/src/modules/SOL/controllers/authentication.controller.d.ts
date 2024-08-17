import { ConfigService } from "@nestjs/config";
import { ResponseDto } from "src/shared/dtos/response.dto";
import { AuthenticateRequestDto } from "../dtos/authenticate-request.dto";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
export declare class AuthenticationController {
    readonly configService: ConfigService;
    private readonly authenticationService;
    private readonly userService;
    constructor(configService: ConfigService, authenticationService: AuthenticationService, userService: UserService);
    authenticate(dto: AuthenticateRequestDto): Promise<ResponseDto>;
    logout(request: any): Promise<ResponseDto>;
    authenticated(request: any): Promise<ResponseDto>;
}
