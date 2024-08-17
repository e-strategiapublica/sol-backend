import { ValidatorContractInterface } from "src/shared/interfaces/validator-contract.interface";
import { UserResetPasswordResendEmailRequestDto } from "../dtos/user-reset-password-resend-email-request.dto";
export declare class UserResetPasswordResendEmailValidator implements ValidatorContractInterface {
    errors: any[];
    validate(dto: UserResetPasswordResendEmailRequestDto): boolean;
}
