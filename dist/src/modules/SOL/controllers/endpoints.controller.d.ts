/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
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
