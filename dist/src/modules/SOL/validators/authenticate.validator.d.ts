import { ValidatorContractInterface } from "src/shared/interfaces/validator-contract.interface";
import { AuthenticateRequestDto } from "../dtos/authenticate-request.dto";
export declare class AuthenticateValidator implements ValidatorContractInterface {
    errors: any[];
    validate(dto: AuthenticateRequestDto): boolean;
}
