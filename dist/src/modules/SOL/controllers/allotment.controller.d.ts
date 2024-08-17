import { ResponseDto } from "src/shared/dtos/response.dto";
import { AllotmentService } from "../services/allotment.service";
import { ItemRequestDto } from "../dtos/item-register-request.dto";
import { AllotUpdateStatusRequestDto } from "../dtos/allotment-update-status-request.dto";
export declare class AllotmentController {
    private readonly allotmentService;
    private readonly logger;
    constructor(allotmentService: AllotmentService);
    list(): Promise<ResponseDto>;
    getAllotById(_id: string): Promise<ResponseDto>;
    addItem(_id: string, dto: ItemRequestDto): Promise<ResponseDto>;
    updateStatus(_id: string, dto: AllotUpdateStatusRequestDto): Promise<ResponseDto>;
    download(_id: string): Promise<any>;
}
