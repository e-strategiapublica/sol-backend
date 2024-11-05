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
