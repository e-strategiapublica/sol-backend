"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EndPointsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndPointsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const endpoints_repository_1 = require("../repositories/endpoints.repository");
const cron_1 = require("cron");
const association_service_1 = require("./association.service");
const endpoints_type_enum_1 = require("../enums/endpoints-type.enum");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const endpoints_status_enum_1 = require("../enums/endpoints-status.enum");
const agreement_service_1 = require("./agreement.service");
const cost_items_service_1 = require("./cost-items.service");
let EndPointsService = EndPointsService_1 = class EndPointsService {
    constructor(schedulerRegistry, endpointsRepository, associationService, httpService, agreementService, costItemsService) {
        this.schedulerRegistry = schedulerRegistry;
        this.endpointsRepository = endpointsRepository;
        this.associationService = associationService;
        this.httpService = httpService;
        this.agreementService = agreementService;
        this.costItemsService = costItemsService;
        this._logger = new common_1.Logger(EndPointsService_1.name);
        this.initAllJobs();
    }
    async createEndpoint(endpoint) {
        const old = await this.endpointsRepository.getByEndpointType(endpoint.endpointType);
        if (old) {
            throw new common_1.BadRequestException('Já existe um endpoint com esse tipo!');
        }
        const newEndpoint = await this.endpointsRepository.register(endpoint);
        if (!newEndpoint)
            return null;
        const job = new cron_1.CronJob(endpoint.frequency, async () => {
            this._logger.debug(`Running endpoint${endpoint.endpointType} :${endpoint.endpointPath}`);
            return this.dynamicJob(endpoint.endpointType);
        });
        this.schedulerRegistry.addCronJob(endpoint.endpointType, job);
        this.schedulerRegistry.getCronJob(endpoint.endpointType).start();
        return newEndpoint;
    }
    async listEndpoints() {
        return await this.endpointsRepository.list();
    }
    async getEndpointById(_id) {
        return await this.endpointsRepository.getById(_id);
    }
    async updateEndpoint(_id, endpoint) {
        endpoint.status = endpoints_status_enum_1.EndPointsStatusEnum.stopped;
        const result = await this.endpointsRepository.update(_id, endpoint);
        if (!result) {
            throw new common_1.BadRequestException('Não foi possivel atualizar esse endpoint!');
        }
        if (this.schedulerRegistry.doesExist("cron", result.endpointType))
            this.schedulerRegistry.deleteCronJob(result.endpointType);
        const job = new cron_1.CronJob(endpoint.frequency, async () => {
            this._logger.debug(`Running endpoint ${endpoint.endpointType} :${endpoint.endpointPath}`);
            return this.dynamicJob(endpoint.endpointType);
        });
        this.schedulerRegistry.addCronJob(result.endpointType, job);
        this.schedulerRegistry.getCronJob(endpoint.endpointType).start();
        return result;
    }
    async deleteEndpointById(_id) {
        const endpoint = await this.endpointsRepository.getById(_id);
        if (!endpoint) {
            throw new common_1.BadRequestException('Não foi possivel deletar esse endpoint!');
        }
        this.schedulerRegistry.deleteCronJob(endpoint.endpointType);
        return await this.endpointsRepository.deleteById(_id);
    }
    async dynamicJob(type) {
        const endpoint = await this.endpointsRepository.getByEndpointType(type);
        endpoint.lastRun = new Date();
        endpoint.status = endpoints_status_enum_1.EndPointsStatusEnum.running;
        await this.endpointsRepository.update(endpoint._id, endpoint);
        try {
            const headers = {
                Authorization: endpoint.token
            };
            const result = await (0, rxjs_1.firstValueFrom)(this.httpService.get(endpoint.endpointPath, { headers }));
            if (result.data) {
                endpoint.status = endpoints_status_enum_1.EndPointsStatusEnum.success;
                await this.endpointsRepository.update(endpoint._id, endpoint);
                if (type === endpoints_type_enum_1.EndPointsTypeEnum.association)
                    return await this.associationService.handlerJob(result.data);
                if (type === endpoints_type_enum_1.EndPointsTypeEnum.agreement)
                    return await this.agreementService.handlerJob(result.data);
                if (type === endpoints_type_enum_1.EndPointsTypeEnum.costItems)
                    return await this.costItemsService.handlerJob(result.data);
            }
            endpoint.status = endpoints_status_enum_1.EndPointsStatusEnum.error;
            endpoint.messageError = 'Não foi possivel obter os dados do endpoint';
            await this.endpointsRepository.update(endpoint._id, endpoint);
            return;
        }
        catch (error) {
            endpoint.status = endpoints_status_enum_1.EndPointsStatusEnum.error;
            endpoint.messageError = error;
            this._logger.error(error);
            await this.endpointsRepository.update(endpoint._id, endpoint);
        }
    }
    async initAllJobs() {
        this._logger.debug('EndpointsService initialized');
        const endpoints = await this.endpointsRepository.list();
        endpoints.forEach((endpoint) => {
            const job = new cron_1.CronJob(endpoint.frequency, async () => {
                this._logger.debug(`Running endpoint ${endpoint.endpointType} :${endpoint.endpointPath}`);
                return this.dynamicJob(endpoint.endpointType);
            });
            this.schedulerRegistry.addCronJob(endpoint.endpointType, job);
            this.schedulerRegistry.getCronJob(endpoint.endpointType).start();
        });
    }
};
EndPointsService = EndPointsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedule_1.SchedulerRegistry,
        endpoints_repository_1.EndPointsRepository,
        association_service_1.AssociationService,
        axios_1.HttpService,
        agreement_service_1.AgreementService,
        cost_items_service_1.CostItemsService])
], EndPointsService);
exports.EndPointsService = EndPointsService;
//# sourceMappingURL=endpoints.service.js.map