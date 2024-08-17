import { Model } from "mongoose";
import { ReportGeneratedModel } from "../models/report-generated.model";
import { ReportGeneratedRegisterRequestDto } from "../dtos/report-generated-register-request.dto";
export declare class ReportRepository {
    private readonly _model;
    constructor(_model: Model<ReportGeneratedModel>);
    register(dto: ReportGeneratedRegisterRequestDto): Promise<any>;
    list(): Promise<ReportGeneratedModel[]>;
    getById(_id: string): Promise<ReportGeneratedModel>;
}
