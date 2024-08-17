import * as mongoose from 'mongoose';
import { User } from "./user.schema";
import { AgreementActiveStatusEnum } from "../enums/agreement-active-status";
import { LegalRepresentative } from "src/shared/schemas/legal-representative.schema";
export declare class Project {
    name: string;
    activeStatus: AgreementActiveStatusEnum;
    project_manager: User;
    legalRepresentative: LegalRepresentative;
    viewer_list: User;
    reviewer_list: User;
}
export declare const ProjectSchema: mongoose.Schema<Project, mongoose.Model<Project, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Project>;
