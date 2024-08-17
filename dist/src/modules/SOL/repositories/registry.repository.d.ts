import { Model } from "mongoose";
import { RegistryRegisterRequestDto } from "../dtos/registry-register-request.dto";
import { RegistryModel } from "../models/registry.model";
import { ConfigService } from "@nestjs/config";
import { RegistrySendRequestDto } from "../dtos/registry-send-request.dto";
import { SecurityService } from "../../../shared/services/security.service";
export declare class RegistryRepository {
    private readonly _model;
    private readonly _configService;
    private readonly _securityService;
    constructor(_model: Model<RegistryModel>, _configService: ConfigService, _securityService: SecurityService);
    getById(_id: string): Promise<RegistryModel | null>;
    listByWallet(wallet: string): Promise<RegistryModel[] | null>;
    getByTransactionHash(transactionHash: string): Promise<RegistryModel | null>;
    register(dto: RegistryRegisterRequestDto): Promise<RegistryModel>;
    send(dto: RegistrySendRequestDto): Promise<{
        ownerAddress: string;
        txHash: any;
        payload: string;
    }>;
}
