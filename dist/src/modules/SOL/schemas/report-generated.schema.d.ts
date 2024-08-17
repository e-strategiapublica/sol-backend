import * as mongoose from "mongoose";
import { User } from "./user.schema";
export declare class ReportGenerated {
    situation: string;
    name: string;
    archive: string;
    generatedBy: User;
}
export declare const ReportGeneratedSchema: mongoose.Schema<ReportGenerated, mongoose.Model<ReportGenerated, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ReportGenerated>;
