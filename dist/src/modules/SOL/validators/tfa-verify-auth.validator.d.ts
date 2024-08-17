import { ValidatorContractInterface } from "src/shared/interfaces/validator-contract.interface";
import { TfaVerifyAuthRequestDto } from "../dtos/tfa-verify-auth-request.dto";
export declare class TfaVerifyAuthValidator implements ValidatorContractInterface {
    errors: any[];
    validate(dto: TfaVerifyAuthRequestDto): boolean;
}
