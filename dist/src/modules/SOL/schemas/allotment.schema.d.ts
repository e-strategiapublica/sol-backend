import mongoose from "mongoose";
import { Items } from "./items.schema";
import { AllotmentStatusEnum } from "../enums/allotment-status.enum";
import { ProposalInAllotmentInterface } from "../interfaces/proposal-in-allotment.interface";
export declare class Allotment {
    allotment_name: string;
    days_to_delivery: string;
    place_to_delivery: string;
    quantity: string;
    files: string;
    status: AllotmentStatusEnum;
    add_item: Items[];
    proposals: ProposalInAllotmentInterface[];
}
export declare const AllotmentSchema: mongoose.Schema<Allotment, mongoose.Model<Allotment, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Allotment>;
