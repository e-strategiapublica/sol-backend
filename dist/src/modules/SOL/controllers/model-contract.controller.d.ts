/// <reference types="multer" />
import { ResponseDto } from "src/shared/dtos/response.dto";
import { ModelContractRegisterDto } from "../dtos/model-contract-register-request.dto";
import { ModelContractService } from "../services/model-contract.service";
import { ModelContractUpdateDto } from "../dtos/model-contract-update-request.dto";
import { BidService } from "../services/bid.service";
export declare class ModelContractController {
    private readonly modelContractService;
    private readonly bidsService;
    private readonly logger;
    constructor(modelContractService: ModelContractService, bidsService: BidService);
    register(file: Express.Multer.File, dto: ModelContractRegisterDto): Promise<ResponseDto>;
    list(): Promise<ResponseDto>;
    getByBidId(_id: string): Promise<ResponseDto>;
    getById(_id: string): Promise<ResponseDto>;
    updateStatus(_id: string, dto: ModelContractUpdateDto, file: Express.Multer.File): Promise<ResponseDto>;
    deleteById(_id: string): Promise<ResponseDto>;
}
