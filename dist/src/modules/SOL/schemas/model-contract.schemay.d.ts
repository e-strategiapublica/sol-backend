import mongoose from "mongoose";
import { ModelContractStatusEnum } from "../enums/model-contract-status.enum";
import { LanguageContractEnum } from "../enums/language-contract.enum";
import { ModelContractClassificationEnum } from "../enums/modelContract-classification.enum";
export declare class ModelContract {
    name: string;
    status: ModelContractStatusEnum;
    classification: ModelContractClassificationEnum;
    contract: string;
    language: LanguageContractEnum;
}
export declare const ModelContractSchema: mongoose.Schema<ModelContract, mongoose.Model<ModelContract, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ModelContract>;
