import mongoose from "mongoose";
import { ProductModel } from "../models/product.model";
export interface ItemsInterface {
    readonly name: string;
    readonly group: string;
    readonly item: string;
    readonly product: ProductModel;
    readonly quantity: string;
    readonly unitMeasure: string;
    readonly specification: string;
}
export interface ItemsInterfaceWithId extends ItemsInterface {
    _id?: mongoose.Types.ObjectId;
}
