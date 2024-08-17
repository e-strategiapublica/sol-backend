import { CostItemsRegisterRequestDto } from "../dtos/cost-items-register-request.dto";
import { CostItemsService } from "../services/cost-items.service";
import { ResponseDto } from "src/shared/dtos/response.dto";
import { CostItemsUpdateRequestDto } from "../dtos/cost-items-update-request.dto";
export declare class CostItemsController {
    private costItemsService;
    private readonly logger;
    constructor(costItemsService: CostItemsService);
    register(dto: CostItemsRegisterRequestDto): Promise<ResponseDto>;
    list(): Promise<ResponseDto>;
    getById(_id: string): Promise<ResponseDto>;
    getProjectManagerById(_id: string): Promise<ResponseDto>;
    updateById(_id: string, dto: CostItemsUpdateRequestDto): Promise<ResponseDto>;
    deleteById(_id: string): Promise<ResponseDto>;
}
