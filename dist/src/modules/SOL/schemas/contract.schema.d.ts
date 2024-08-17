import { ContractStatusEnum } from "../enums/contract-status.enum";
import { User } from "./user.schema";
import mongoose from "mongoose";
import { Bids } from "./bids.schema";
import { Supplier } from "./supplier.schema";
import { Proposal } from "./proposal.schema";
export declare class Contract {
    sequencial_number: number;
    contract_number: string;
    bid_number: Bids;
    association_accept: boolean;
    supplier_accept: boolean;
    association_sign_date: string;
    supplier_sign_date: string;
    contract_document: string;
    value: string;
    deleted: boolean;
    status: ContractStatusEnum;
    proposal_id: Proposal[];
    supplier_id: Supplier;
    association_id: User;
    items_received: number;
}
export declare const ContractSchema: mongoose.Schema<Contract, mongoose.Model<Contract, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Contract>;
