import { WorkPlanModel } from "../models/work-plan.model";
import { Model } from "mongoose";
import { WorkPlanInterface } from "../interfaces/agreement.interface";
export declare class WorkPlanRepository {
    private readonly _model;
    private url;
    private dbName;
    private collection;
    constructor(_model: Model<WorkPlanModel>);
    findById(id: string): Promise<WorkPlanModel>;
    deleteById(id: string): Promise<WorkPlanModel>;
    register(dto: any): Promise<any>;
    findAll(): Promise<WorkPlanModel[]>;
    update(id: string, dto: WorkPlanInterface): Promise<WorkPlanModel>;
    listByIds(ids: string[]): Promise<WorkPlanModel[]>;
}
