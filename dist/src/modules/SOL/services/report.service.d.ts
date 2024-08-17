import { ContractRepository } from "../repositories/contract.repository";
import { ReportContractResponseDto } from "../dtos/report-contract.response.dto";
import { BidRepository } from "../repositories/bid.repository";
import { UserRepository } from "../repositories/user.repository";
import { ReportRepository } from "../repositories/report.repository";
import { FileRepository } from "../repositories/file.repository";
import { ReportGeneratedModel } from "../models/report-generated.model";
import { SupplierModel } from "../models/supplier.model";
import { SupplierRepository } from "../repositories/supplier.repository";
import { AgreementRepository } from "../repositories/agreement.repository";
interface SupplierRepeatedInfo {
    supplierId: string;
    count: number;
    documents: any;
}
export declare class ReportService {
    private _contractRepository;
    private _bidRepository;
    private _userRepository;
    private _reportRepository;
    private readonly _fileRepository;
    private readonly _supplierRepository;
    private _agreementRepository;
    private readonly _logger;
    private readonly csvOptions;
    constructor(_contractRepository: ContractRepository, _bidRepository: BidRepository, _userRepository: UserRepository, _reportRepository: ReportRepository, _fileRepository: FileRepository, _supplierRepository: SupplierRepository, _agreementRepository: AgreementRepository);
    getDataContract(): Promise<ReportContractResponseDto>;
    getSpreadsheet(type: string, generatedById: any): Promise<string>;
    findRepeatedIds(objects: any[]): Promise<{
        id: SupplierModel;
        count: number;
    }[]>;
    findSupplierIdRepetitions(objects: any[]): Promise<SupplierRepeatedInfo[]>;
    generateExcel(jsonData: any, columnNames: string[], spreadsheetName: string): Promise<string>;
    getReportGenerated(): Promise<ReportGeneratedModel[]>;
    private convertBlobToBase64;
    downloadReportGeneratedById(_id: string): Promise<any>;
}
export {};
