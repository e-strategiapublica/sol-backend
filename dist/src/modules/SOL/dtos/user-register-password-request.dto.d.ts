import { UserStatusEnum } from "../enums/user-status.enum";
export declare class UserRegisterPasswordRequestDto {
    email: string;
    status: UserStatusEnum;
    password: string;
}
