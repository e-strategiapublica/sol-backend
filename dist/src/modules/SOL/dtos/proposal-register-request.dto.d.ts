import { ProposalStatusEnum } from "../enums/proposal-status.enum";
import { BidModel } from "../models/bid.model";
import { AllotmentModel } from "../models/allotment.model";
import { UserModel } from "../models/user.model";
import { ValueForAllotmentInterface } from "../interfaces/value-for-allotment.interface";
export declare abstract class ProposalRegisterDto {
    total_value: string;
    deleted: boolean;
    status: ProposalStatusEnum;
    item_list: string[];
    licitacaoId: string;
    proposedById: string;
    proposedBy: UserModel;
    bid: BidModel;
    allotmentIds: string[];
    allotment: AllotmentModel[];
    file: string;
    association_accept: boolean;
    supplier_accept: boolean;
    proposalWin: boolean;
    freight: number;
    totalValueForAllotment?: ValueForAllotmentInterface[];
}
