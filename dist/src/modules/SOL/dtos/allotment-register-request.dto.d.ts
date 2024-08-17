import { ProposalRegisterDto } from "./proposal-register-request.dto";
import { ItemRequestDto } from "./item-register-request.dto";
import { AllotmentStatusEnum } from "../enums/allotment-status.enum";
export declare abstract class AllotmentRegisterDto {
    allotment_name: string;
    days_to_delivery: string;
    place_to_delivery: string;
    quantity: string;
    files: string;
    proposals: ProposalRegisterDto[];
    add_item: ItemRequestDto[];
    status: AllotmentStatusEnum;
}
