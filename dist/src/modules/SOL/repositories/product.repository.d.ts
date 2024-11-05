import { Model } from "mongoose";
import { ProductModel } from "../models/product.model";
import { ProductRegisterDto } from "../dtos/product-register-request.dto";
export declare class ProductRepository {
    private readonly _model;
    constructor(_model: Model<ProductModel>);
    register(dto: ProductRegisterDto): Promise<any>;
    update(_id: string, dto: ProductRegisterDto): Promise<ProductModel>;
    list(): Promise<ProductModel[]>;
    getById(_id: string): Promise<ProductModel>;
    getByIdentifier(identifier: number): Promise<ProductModel>;
    deleteById(_id: string): Promise<ProductModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getByName(product_name: string): Promise<ProductModel>;
}
