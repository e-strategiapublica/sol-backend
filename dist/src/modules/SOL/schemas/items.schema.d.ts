import mongoose from "mongoose";
export declare class Items {
    _id: string;
    name: string;
    group: string;
    item: string;
    quantity: string;
    unitMeasure: string;
    specification: string;
}
export declare const ItemsSchema: mongoose.Schema<Items, mongoose.Model<Items, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Items>;
