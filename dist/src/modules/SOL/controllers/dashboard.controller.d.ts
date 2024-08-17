import { ResponseDto } from "src/shared/dtos/response.dto";
import { DashboardService } from "../services/dashboard.service";
export declare class DashboardController {
    private _dashboardService;
    private readonly _logger;
    constructor(_dashboardService: DashboardService);
    get(): Promise<ResponseDto>;
}
