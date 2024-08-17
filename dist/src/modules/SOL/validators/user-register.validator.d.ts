import { ValidatorContractInterface } from "src/shared/interfaces/validator-contract.interface";
import { UserRegisterRequestDto } from "../dtos/user-register-request.dto";
export declare class UserRegisterValidator implements ValidatorContractInterface {
    errors: any[];
    validate(dto: UserRegisterRequestDto): boolean;
}
