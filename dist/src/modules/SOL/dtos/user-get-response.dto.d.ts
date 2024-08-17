import { NotificationInterface } from "../interfaces/notification.interface";
import { AssociationModel } from "../models/association.model";
import { SupplierModel } from "../models/supplier.model";
export declare class UserGetResponseDto {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    document: string;
    profilePicture?: string;
    office?: string;
    association?: AssociationModel;
    supplier?: SupplierModel;
    roles?: string;
    notification_list?: NotificationInterface[];
    constructor(_id: string, name: string, email: string, phone: string, status: string, document: string, profilePicture?: string, office?: string, association?: AssociationModel, supplier?: SupplierModel, roles?: string, notification_list?: NotificationInterface[]);
}
