import { BidModel } from "../models/bid.model";
import { ProposalModel } from "../models/proposal.model";
export declare class ProposalGetByBidResponseDto {
    proposals: ProposalModel[];
    bid: BidModel;
    constructor(proposals: ProposalModel[], bid: BidModel);
}
