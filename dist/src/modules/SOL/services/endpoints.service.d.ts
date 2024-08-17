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
import { SchedulerRegistry } from "@nestjs/schedule";
import { EndPointsModel } from "../models/endpoints.model";
import { EndPointsInterface } from "../interfaces/endpoits.interface";
import { EndPointsRepository } from "../repositories/endpoints.repository";
import { AssociationService } from "./association.service";
import { EndPointsTypeEnum } from "../enums/endpoints-type.enum";
import { HttpService } from "@nestjs/axios";
import { AgreementService } from "./agreement.service";
import { CostItemsService } from "./cost-items.service";
export declare class EndPointsService {
    private schedulerRegistry;
    private endpointsRepository;
    private associationService;
    private httpService;
    private agreementService;
    private costItemsService;
    private readonly _logger;
    constructor(schedulerRegistry: SchedulerRegistry, endpointsRepository: EndPointsRepository, associationService: AssociationService, httpService: HttpService, agreementService: AgreementService, costItemsService: CostItemsService);
    createEndpoint(endpoint: EndPointsInterface): Promise<EndPointsModel>;
    listEndpoints(): Promise<EndPointsModel[]>;
    getEndpointById(_id: string): Promise<EndPointsModel>;
    updateEndpoint(_id: string, endpoint: EndPointsInterface): Promise<EndPointsModel>;
    deleteEndpointById(_id: string): Promise<EndPointsModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    dynamicJob(type: EndPointsTypeEnum): Promise<void>;
    initAllJobs(): Promise<void>;
}
