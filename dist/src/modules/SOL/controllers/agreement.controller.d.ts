import { ResponseDto } from "src/shared/dtos/response.dto";
import { AgreementRegisterRequestDto } from "../dtos/agreement-register-request.dto";
import { AgreementService } from "../services/agreement.service";
import { WorkPlanWorkPlanRequestDto } from "../dtos/work-plan-add-work-plan-request.dto";
import { UserTypeRequestDto } from "../dtos/user-type-request.dto";
export declare class AgreementController {
    private _airdropService;
    private readonly _logger;
    constructor(_airdropService: AgreementService);
    get(): Promise<ResponseDto>;
    findAgreementsWithOutProject(): Promise<ResponseDto>;
    getForAssociation(request: any): Promise<ResponseDto>;
    getAgreementsWithProjects(): Promise<ResponseDto>;
    register(request: any, dto: AgreementRegisterRequestDto): Promise<ResponseDto>;
    findById(id: string): Promise<ResponseDto>;
    findAgreementByUserId(id: string, userRoles: UserTypeRequestDto): Promise<ResponseDto>;
    deleteById(id: string): Promise<ResponseDto>;
    update(id: string, dto: AgreementRegisterRequestDto): Promise<ResponseDto>;
    addWorkPlan(id: string, dto: WorkPlanWorkPlanRequestDto): Promise<ResponseDto>;
    removeWorkPlan(id: string, dto: WorkPlanWorkPlanRequestDto): Promise<import("../interfaces/agreement.interface").AgreementInterface>;
}
