import mongoose from "mongoose";
import { GroupCostItemRealation } from "./group-costItem-relation.schema";
export declare class Group {
    name: string;
    idAgreements: string;
    items: GroupCostItemRealation[];
}
export declare const GroupSchema: mongoose.Schema<Group, mongoose.Model<Group, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Group>;
