import { UserModel } from "../models/user.model";
export declare abstract class TfaDeleteRequestDto {
    code: number;
    secret: string;
    password: string;
    userId: string;
    user: UserModel;
}
