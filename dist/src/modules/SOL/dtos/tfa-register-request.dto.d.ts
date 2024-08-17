import { UserModel } from "../models/user.model";
export declare abstract class TfaRegisterRequestDto {
    secret: string;
    url: string;
    userId: string;
    user: UserModel;
}
