import { ItemRequestDto } from "./item-register-request.dto";
import { ProposalRegisterDto } from "./proposal-register-request.dto";
import { AllotmentStatusEnum } from "../enums/allotment-status.enum";
export declare abstract class AllotmentRequestDto {
    allotment_name: string;
    days_to_delivery: string;
    place_to_delivery: string;
    quantity: string;
    unitMeasure: string;
    files: string;
    add_item: ItemRequestDto[];
    proposals: ProposalRegisterDto[];
    status: AllotmentStatusEnum;
    _id?: string;
}
