import { AllotmentRequestDto } from "./allotment-request.dto";
import { BidStatusEnum } from "../enums/bid-status.enum";
import { AgreementInterface } from "../interfaces/agreement.interface";
import { Supplier } from "../schemas/supplier.schema";
export declare abstract class BidUpdateDto {
    description: string;
    agreementId: string;
    classification: string;
    start_at: string;
    end_at: string;
    bid_type: string;
    days_to_delivery: string;
    days_to_tiebreaker: string;
    local_to_delivery: string;
    status: BidStatusEnum;
    aditional_site: string;
    add_allotment: AllotmentRequestDto[];
    invited_suppliers: Supplier[];
    agreement: AgreementInterface;
}
