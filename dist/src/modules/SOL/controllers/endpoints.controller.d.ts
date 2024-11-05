import { EndPointsService } from "../services/endpoints.service";
import { EndPointsRegisterRequestDto } from "../dtos/endpoints-register-request.dto";
export declare class EndPointsController {
    private _endPointsService;
    private readonly _logger;
    constructor(_endPointsService: EndPointsService);
    list(): Promise<import("../models/endpoints.model").EndPointsModel[]>;
    getById(id: string): Promise<import("../models/endpoints.model").EndPointsModel>;
    create(body: EndPointsRegisterRequestDto): Promise<import("../models/endpoints.model").EndPointsModel>;
    jobTest(type: string): Promise<{
        type: string;
    }>;
    update(id: string, body: EndPointsRegisterRequestDto): Promise<import("../models/endpoints.model").EndPointsModel>;
    delete(id: string): Promise<import("../models/endpoints.model").EndPointsModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
