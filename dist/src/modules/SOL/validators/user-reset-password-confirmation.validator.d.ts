import { ValidatorContractInterface } from "src/shared/interfaces/validator-contract.interface";
import { UserResetPasswordConfirmationRequestDto } from "../dtos/user-reset-password-confirmation-request.dto";
export declare class UserResetPasswordConfirmationValidator implements ValidatorContractInterface {
    errors: any[];
    validate(dto: UserResetPasswordConfirmationRequestDto): boolean;
}
