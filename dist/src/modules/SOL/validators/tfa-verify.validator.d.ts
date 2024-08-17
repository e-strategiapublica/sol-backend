import { ValidatorContractInterface } from "src/shared/interfaces/validator-contract.interface";
import { TfaVerifyRequestDto } from "../dtos/tfa-verify-request.dto";
export declare class TfaVerifyValidator implements ValidatorContractInterface {
    errors: any[];
    validate(dto: TfaVerifyRequestDto): boolean;
}
