import { UserTypeEnum } from '../enums/user-type.enum';
import { UserStatusEnum } from "../enums/user-status.enum";
import { UserRolesEnum } from '../enums/user-roles.enum';
export declare abstract class UserRegisterRequestDto {
    email: string;
    name: string;
    phone: string;
    type: UserTypeEnum;
    document: string;
    office: string;
    association: string;
    supplier?: string;
    roles: UserRolesEnum;
    status: UserStatusEnum;
}
