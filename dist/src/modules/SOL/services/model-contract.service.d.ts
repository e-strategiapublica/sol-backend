/// <reference types="multer" />
import { ModelContractRepository } from "../repositories/model-contract.repository";
import { ModelContractRegisterDto } from "../dtos/model-contract-register-request.dto";
import { ModelContractUpdateDto } from "../dtos/model-contract-update-request.dto";
import { BidRepository } from "../repositories/bid.repository";
import { ModelContractModel } from "../models/model-contract.model";
import { BidModel } from "../models/bid.model";
export declare class ModelContractService {
    private readonly _modelContractRepository;
    private readonly _bidsRepository;
    private readonly _logger;
    constructor(_modelContractRepository: ModelContractRepository, _bidsRepository: BidRepository);
    register(dto: ModelContractRegisterDto, file: Express.Multer.File): Promise<ModelContractModel>;
    list(): Promise<ModelContractModel[]>;
    update(_id: string, dto: ModelContractUpdateDto, file: Express.Multer.File): Promise<ModelContractModel>;
    getById(_id: string): Promise<ModelContractModel>;
    getBidById(_id: string): Promise<BidModel>;
    deleteById(_id: string): Promise<import("mongodb").DeleteResult>;
}
