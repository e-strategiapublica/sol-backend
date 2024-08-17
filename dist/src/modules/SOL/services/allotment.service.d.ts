import { AllotmentRepository } from "../repositories/allotment.repository";
import { AllotmentModel } from "../models/allotment.model";
import { AllotmentRegisterDto } from "../dtos/allotment-register-request.dto";
import { AllotAddProposalDto } from "../dtos/allotment-add-proposal-request.dto";
import { ItemRequestDto } from "../dtos/item-register-request.dto";
import { FileRepository } from "../repositories/file.repository";
import { AllotmentStatusEnum } from "../enums/allotment-status.enum";
export declare class AllotmentService {
    private readonly _allotmentRepository;
    private readonly _fileRepository;
    private readonly _logger;
    constructor(_allotmentRepository: AllotmentRepository, _fileRepository: FileRepository);
    register(dto: AllotmentRegisterDto): Promise<AllotmentModel>;
    list(): Promise<AllotmentModel[]>;
    listById(_id: string): Promise<AllotmentModel>;
    updateStatus(_id: string, status: AllotmentStatusEnum): Promise<AllotmentModel>;
    updateProposal(_id: string, dto: AllotAddProposalDto): Promise<AllotmentModel>;
    downloadAllotmentById(_id: string): Promise<any>;
    updateItem(_id: string, dto: ItemRequestDto): Promise<AllotmentModel>;
}
