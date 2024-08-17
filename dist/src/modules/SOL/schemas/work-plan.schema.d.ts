import mongoose from "mongoose";
import { Items } from "./items.schema";
export declare class WorkPlan {
    name: string;
    product: Array<{
        quantity: number;
        unit: string;
        unitValue: number;
        items: Items;
    }>;
}
export declare const WorkPlanSchema: mongoose.Schema<WorkPlan, mongoose.Model<WorkPlan, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, WorkPlan>;
