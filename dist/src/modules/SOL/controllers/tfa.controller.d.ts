import { ResponseDto } from 'src/shared/dtos/response.dto';
import { TfaDeleteRequestDto } from '../dtos/tfa-delete-request.dto';
import { TfaRegisterRequestDto } from '../dtos/tfa-register-request.dto';
import { TfaVerifyAuthRequestDto } from '../dtos/tfa-verify-auth-request.dto';
import { TfaVerifyRequestDto } from '../dtos/tfa-verify-request.dto';
import { UserRepository } from '../repositories/user.repository';
import { AuthenticationService } from '../services/authentication.service';
import { TfaService } from '../services/tfa.service';
export declare class TfaController {
    private readonly _tfaService;
    private readonly _userRepository;
    private readonly authenticationService;
    constructor(_tfaService: TfaService, _userRepository: UserRepository, authenticationService: AuthenticationService);
    get(request: any): Promise<ResponseDto>;
    registrar(request: any, dto: TfaRegisterRequestDto): Promise<ResponseDto>;
    delete(request: any, dto: TfaDeleteRequestDto): Promise<ResponseDto>;
    verify(dto: TfaVerifyRequestDto): Promise<ResponseDto>;
    verifyRegistered(request: any, dto: TfaVerifyAuthRequestDto): Promise<ResponseDto>;
}
