import { WorkPlanRepository } from "../repositories/work-plan.repository";
import { WorkPlanRegisterRequestDto } from "../dtos/work-plan-register-request.dto";
import { CostItemsService } from "./cost-items.service";
import { ItemsModel } from "../models/database/items.model";
import { WorkPlanModel } from "../models/work-plan.model";
export declare class WorkPlanService {
    private readonly _workPlanRepository;
    private readonly _costItemsService;
    private readonly _itemsModel;
    constructor(_workPlanRepository: WorkPlanRepository, _costItemsService: CostItemsService, _itemsModel: ItemsModel);
    findById(id: string): Promise<WorkPlanModel>;
    deleteById(id: string): Promise<WorkPlanModel>;
    register(dto: any): Promise<WorkPlanModel>;
    registerFromIntegration(dto: WorkPlanRegisterRequestDto): Promise<WorkPlanModel>;
    findAll(): Promise<WorkPlanModel[]>;
    listByIds(ids: string[]): Promise<WorkPlanModel[]>;
    update(id: string, dto: any): Promise<WorkPlanModel>;
}
