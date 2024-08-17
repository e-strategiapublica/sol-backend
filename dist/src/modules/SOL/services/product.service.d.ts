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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ProductRepository } from "../repositories/product.repository";
import { ProductRegisterDto } from "../dtos/product-register-request.dto";
import { ProductModel } from "../models/product.model";
export declare class ProductService {
    private readonly _productRepository;
    private readonly _logger;
    constructor(_productRepository: ProductRepository);
    register(dto: ProductRegisterDto): Promise<ProductModel>;
    list(): Promise<ProductModel[]>;
    update(_id: string, dto: ProductRegisterDto): Promise<ProductModel>;
    getById(_id: string): Promise<ProductModel>;
    deleteById(_id: string): Promise<ProductModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getByName(name: string): Promise<ProductModel>;
}
