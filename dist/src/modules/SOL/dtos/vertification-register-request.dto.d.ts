import { UserModel } from "../models/user.model";
export declare class VerificationRegisterRequestDto {
    attempt: number;
    deadline: Date;
    user: UserModel;
    code: number;
    constructor(attempt: number, deadline: Date, user: UserModel, code: number);
}
