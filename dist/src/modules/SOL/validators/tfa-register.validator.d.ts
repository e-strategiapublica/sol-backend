import { ValidatorContractInterface } from "src/shared/interfaces/validator-contract.interface";
import { TfaRegisterRequestDto } from "../dtos/tfa-register-request.dto";
export declare class TfaRegisterValidator implements ValidatorContractInterface {
    errors: any[];
    validate(dto: TfaRegisterRequestDto): boolean;
}
