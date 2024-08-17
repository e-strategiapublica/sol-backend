import { ContractStatusEnum } from "../enums/contract-status.enum";
import { ProposalModel } from "../models/proposal.model";
export declare abstract class ContractRegisterDto {
    contract_number: string;
    bid_number: string;
    value: string;
    contract_document: string;
    association_accept: boolean;
    supplier_accept: boolean;
    status: ContractStatusEnum;
    proposal_id: ProposalModel[];
    association_id: string;
    supplier_id: string;
}
