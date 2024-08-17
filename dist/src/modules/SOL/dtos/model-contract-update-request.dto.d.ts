import { ModelContractStatusEnum } from "../enums/model-contract-status.enum";
import { LanguageContractEnum } from "../enums/language-contract.enum";
import { ModelContractClassificationEnum } from "../enums/modelContract-classification.enum";
export declare abstract class ModelContractUpdateDto {
    name: string;
    status: ModelContractStatusEnum;
    classification: ModelContractClassificationEnum;
    contract: string;
    language: LanguageContractEnum;
}
