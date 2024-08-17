/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { ContractModel } from "../models/contract.model";
import { ContractRegisterDto } from "../dtos/contract-register-request.dto";
import { ContractUpdateDto } from "../dtos/contract-update-request.dto";
import { ContractUpdateStatusItemDto } from "../dtos/contract-update-status-item-request.dto";
export declare class ContractRepository {
    private readonly _model;
    constructor(_model: Model<ContractModel>);
    register(dto: ContractRegisterDto): Promise<ContractModel>;
    addProposal(dto: ContractModel): Promise<ContractModel>;
    updateStatus(_id: string, dto: ContractUpdateDto): Promise<ContractModel>;
    updateContractNumber(_id: string, sequencial: number): Promise<ContractModel>;
    signAssociation(_id: string, dto: ContractUpdateDto): Promise<ContractModel>;
    signSupplier(_id: string, dto: ContractUpdateDto): Promise<ContractModel>;
    checkAllsignatures(_id: string): Promise<ContractModel>;
    list(): Promise<ContractModel[]>;
    listByAssociationId(_id: string): Promise<ContractModel[]>;
    listBidStatusCompleted(): Promise<ContractModel[]>;
    listNonDeleted(): Promise<ContractModel[]>;
    getById(_id: string): Promise<ContractModel>;
    getByBidId(_id: string): Promise<ContractModel[]>;
    deleteById(_id: string): Promise<ContractModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateStatusAndItens(_id: string, dto: ContractUpdateStatusItemDto): Promise<ContractModel>;
    updateValueAndProposal(_id: string, dto: {
        value: string;
        proposal: any[];
    }): Promise<ContractModel>;
    listByBidIds(_ids: string[]): Promise<ContractModel[]>;
}
