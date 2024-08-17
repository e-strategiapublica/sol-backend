import { ResponseDto } from "src/shared/dtos/response.dto";
import { ContractService } from "../services/contract.service";
import { ContractRegisterDto } from "../dtos/contract-register-request.dto";
import { ContractUpdateDto } from "../dtos/contract-update-request.dto";
import { ContractUpdateStatusItemDto } from "../dtos/contract-update-status-item-request.dto";
import { Response } from "express";
export declare class ContractController {
    private readonly contractService;
    private readonly logger;
    constructor(contractService: ContractService);
    register(dto: ContractRegisterDto): Promise<ResponseDto>;
    list(): Promise<ResponseDto>;
    getById(_id: string): Promise<ResponseDto>;
    listByUserId(_id: string): Promise<ResponseDto>;
    getByBidId(_id: string): Promise<ResponseDto>;
    updateStatus(_id: string, dto: ContractUpdateDto): Promise<ResponseDto>;
    updateStatusItens(_id: string, dto: ContractUpdateStatusItemDto): Promise<ResponseDto>;
    signAssociation(_id: string, dto: ContractUpdateDto): Promise<ResponseDto>;
    contractPdf(_id: string): Promise<ResponseDto>;
    signSupplier(_id: string, dto: ContractUpdateDto): Promise<ResponseDto>;
    deleteById(_id: string): Promise<ResponseDto>;
    createDocument(_id: string, language: string, type: string, res: Response): Promise<void>;
}
