import { TfaGetResponseDto } from "../dtos/tfa-get-response.dto";
import { TfaRepository } from "../repositories/tfa.repository";
import { UserRepository } from "../repositories/user.repository";
import { TfaRegisterRequestDto } from "../dtos/tfa-register-request.dto";
import { TfaVerifyRequestDto } from "../dtos/tfa-verify-request.dto";
import { TfaVerifyAuthRequestDto } from "../dtos/tfa-verify-auth-request.dto";
import { TfaDeleteRequestDto } from "../dtos/tfa-delete-request.dto";
import { AuthenticateResponseDto } from "../dtos/authenticate-responsedto";
import { AuthenticationService } from "./authentication.service";
export declare class TfaService {
    private readonly _tfaRepository;
    private readonly _userRepository;
    private readonly authenticationService;
    constructor(_tfaRepository: TfaRepository, _userRepository: UserRepository, authenticationService: AuthenticationService);
    getByUserId(userId: string): Promise<TfaGetResponseDto>;
    register(dto: TfaRegisterRequestDto): Promise<AuthenticateResponseDto>;
    delete(dto: TfaDeleteRequestDto): Promise<AuthenticateResponseDto>;
    verify(dto: TfaVerifyRequestDto): boolean;
    verifyAuth(userId: string, dto: TfaVerifyAuthRequestDto): Promise<boolean>;
}
