import { Category } from "./category.schema";
import * as mongoose from 'mongoose';
import { Products } from "./product.schema";
export declare class CostItems {
    name: string;
    code: string;
    unitMeasure: string;
    specification: string;
    sustainable: boolean;
    category: Category;
    product: Products;
    product_relation: string;
}
export declare const CostItemsSchema: mongoose.Schema<CostItems, mongoose.Model<CostItems, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CostItems>;
