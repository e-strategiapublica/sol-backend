import mongoose from 'mongoose';
import { UserTypeEnum } from '../enums/user-type.enum';
import { UserRolesEnum } from "../enums/user-roles.enum";
import { Notification } from './notification.schema';
import { Supplier } from './supplier.schema';
import { Association } from './association.schema';
export declare class User {
    name: string;
    email: string;
    password: string;
    document: string;
    phone: string;
    status: string;
    type: UserTypeEnum;
    profilePicture: string;
    office: string;
    association: Association;
    supplier: Supplier;
    roles: UserRolesEnum;
    notification_list: Notification[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
