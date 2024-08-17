import { ValidatorContractInterface } from "src/shared/interfaces/validator-contract.interface";
import { UserUpdateRequestDto } from "../dtos/user-update-request.dto";
export declare class UserUpdateValidator implements ValidatorContractInterface {
    errors: any[];
    validate(dto: UserUpdateRequestDto): boolean;
}
