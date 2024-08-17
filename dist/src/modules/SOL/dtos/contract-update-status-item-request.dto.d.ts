import { ContractStatusEnum } from "../enums/contract-status.enum";
export declare abstract class ContractUpdateStatusItemDto {
    status: ContractStatusEnum;
    items_received: number;
}
