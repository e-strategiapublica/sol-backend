import { WorkPlanService } from "../services/work-plan.service";
import { ResponseDto } from "src/shared/dtos/response.dto";
import { WorkPlanRegisterRequestDto } from "../dtos/work-plan-register-request.dto";
export declare class WorkPlanController {
    private _workPlanService;
    private readonly _logger;
    constructor(_workPlanService: WorkPlanService);
    list(): Promise<ResponseDto>;
    findById(id: string): Promise<ResponseDto>;
    register(dto: any): Promise<ResponseDto>;
    update(id: string, dto: WorkPlanRegisterRequestDto): Promise<ResponseDto>;
}
