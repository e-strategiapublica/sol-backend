import { ResponseDto } from "src/shared/dtos/response.dto";
import { ReportService } from "../services/report.service";
import { Response } from 'express';
export declare class ReportController {
    private _reportService;
    private readonly _logger;
    constructor(_reportService: ReportService);
    get(): Promise<ResponseDto>;
    getReportGenerated(): Promise<ResponseDto>;
    generateExcel(res: Response, type: string, request: any): Promise<void>;
    donwloadArchive(_id: string): Promise<ResponseDto>;
}
