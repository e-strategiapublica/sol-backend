import { ContractStatusEnum } from "../enums/contract-status.enum";
export declare abstract class ContractUpdateDto {
    status: ContractStatusEnum;
    association_id: string;
}
