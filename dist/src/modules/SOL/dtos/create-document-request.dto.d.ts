import { ModelContractClassificationEnum } from "../enums/modelContract-classification.enum";
export declare abstract class CreateDocumentRequestDto {
    language: string;
    type: ModelContractClassificationEnum;
}
