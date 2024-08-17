import { BidStatusEnum } from "../enums/bid-status.enum";
import { UserInterface } from "../interfaces/user.interface";
import { AllotmentStatusEnum } from "../enums/allotment-status.enum";
export declare abstract class BidUpdateStatusRequestDto {
    status: BidStatusEnum;
    declined_reason: string;
    proofreader: UserInterface;
    allomentStatus: AllotmentStatusEnum;
}
