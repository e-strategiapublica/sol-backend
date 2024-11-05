import mongoose from "mongoose";
import { LegalRepresentative } from "src/shared/schemas/legal-representative.schema";
import { Notification } from "./notification.schema";
import { Category } from "./category.schema";
import { SuplierTypeEnum } from "../enums/supplier-type.enum";
import { Address } from "src/shared/schemas/address.schema";
import { User } from "../../../shared/schemas/user.schema";
export declare class Supplier {
    name: string;
    cpf: string;
    blocked: boolean;
    blocked_reason: string;
    type: SuplierTypeEnum;
    address: Address;
    legal_representative: LegalRepresentative;
    group_id: string[];
    notification_list: Notification[];
    categories: Category[];
    users: User[];
}
export declare const SupplierSchema: mongoose.Schema<Supplier, mongoose.Model<Supplier, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Supplier>;
