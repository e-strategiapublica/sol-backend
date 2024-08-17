import { ValidatorContractInterface } from "src/shared/interfaces/validator-contract.interface";
import { UserUpdatePasswordRequestDto } from "../dtos/user-update-password-request.dto";
export declare class UserUpdatePasswordValidator implements ValidatorContractInterface {
    errors: any[];
    validate(dto: UserUpdatePasswordRequestDto): boolean;
}
