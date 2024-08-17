import { UserModel } from "../models/user.model";
export declare abstract class IndicateRegisterRequestDto {
    code: string;
    transactionId: string;
    userId: string;
    user: UserModel;
}
