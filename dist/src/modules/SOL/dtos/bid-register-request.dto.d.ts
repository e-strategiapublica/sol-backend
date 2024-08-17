import { BidTypeEnum } from "../enums/bid-type.enum";
import { BidModalityEnum } from "../enums/bid-modality.enum";
import { AllotmentRequestDto } from "./allotment-request.dto";
import { BidStatusEnum } from "../enums/bid-status.enum";
import { UserInterface } from "../interfaces/user.interface";
import { AgreementInterface } from "../interfaces/agreement.interface";
export declare abstract class BideRegisterDto {
    bid_count: string;
    description: string;
    agreementId: string;
    classification: string;
    start_at: string;
    end_at: string;
    days_to_delivery: string;
    days_to_tiebreaker: string;
    local_to_delivery: string;
    status: BidStatusEnum;
    bid_type: BidTypeEnum;
    modality: BidModalityEnum;
    aditional_site: string;
    add_allotment: AllotmentRequestDto[];
    invited_suppliers: string[];
    editalFile: string;
    ataFile: string;
    state: string;
    city: string;
    association: UserInterface;
    agreement: AgreementInterface;
    additionalDocuments: string[];
}
