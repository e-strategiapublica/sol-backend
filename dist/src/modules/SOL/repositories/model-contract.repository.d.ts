import { Model } from "mongoose";
import { ModelContractRegisterDto } from "../dtos/model-contract-register-request.dto";
import { ModelContractUpdateDto } from "../dtos/model-contract-update-request.dto";
import { ModelContractModel } from "../models/model-contract.model";
import { ModelContractClassificationEnum } from "../enums/modelContract-classification.enum";
export declare class ModelContractRepository {
    private readonly _model;
    constructor(_model: Model<ModelContractModel>);
    register(dto: ModelContractRegisterDto): Promise<ModelContractModel>;
    update(_id: string, dto: ModelContractUpdateDto): Promise<ModelContractModel>;
    list(): Promise<ModelContractModel[]>;
    getById(_id: string): Promise<ModelContractModel>;
    getByBidId(_id: string): Promise<ModelContractModel>;
    getByClassification(classification: string): Promise<ModelContractModel>;
    deleteById(_id: string): Promise<import("mongodb").DeleteResult>;
    getByContractAndLanguage(lang: string, classification: ModelContractClassificationEnum): Promise<ModelContractModel>;
}
