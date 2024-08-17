import * as mongoose from 'mongoose';
import { User } from "./user.schema";
import { AgreementStatusEnum } from "../enums/agreement-status.enum";
import { Association } from "./association.schema";
import { WorkPlan } from "./work-plan.schema";
import { AgreementActiveStatusEnum } from "../enums/agreement-active-status";
import { Project } from "./project.schema";
export declare class Agreement {
    register_number: string;
    register_object: string;
    status: AgreementStatusEnum;
    city: string;
    states: string;
    value: number;
    signature_date: Date;
    validity_date: Date;
    association: Association;
    project: Project;
    manager: User;
    workPlan: WorkPlan[];
    activeStatus: AgreementActiveStatusEnum;
    reviewer: User;
}
export declare const AgreementSchema: mongoose.Schema<Agreement, mongoose.Model<Agreement, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Agreement>;
