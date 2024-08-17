/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
