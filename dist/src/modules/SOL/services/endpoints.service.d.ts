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
