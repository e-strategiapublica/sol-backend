import { ProposalStatusEnum } from "../enums/proposal-status.enum";
export declare abstract class AllotAddProposalDto {
    total_value: string;
    deleted: boolean;
    association_accept: boolean;
    supplier_accept: boolean;
    status: ProposalStatusEnum;
    item_list: string[];
}
