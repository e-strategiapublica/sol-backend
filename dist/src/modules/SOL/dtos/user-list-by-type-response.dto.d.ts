import { UserStatusEnum } from "../enums/user-status.enum";
import { UserTypeEnum } from "../enums/user-type.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { AssociationModel } from "../models/association.model";
export declare class UserListByTypeResponseDto {
    _id: string;
    name: string;
    email: string;
    status: UserStatusEnum;
    type: UserTypeEnum;
    profilePicture?: string;
    phone?: string;
    document?: string;
    office?: string;
    association?: AssociationModel;
    supplier?: string;
    roles?: UserRolesEnum;
    constructor(_id: string, name: string, email: string, status: UserStatusEnum, type: UserTypeEnum, profilePicture?: string, phone?: string, document?: string, office?: string, association?: AssociationModel, supplier?: string, roles?: UserRolesEnum);
}
