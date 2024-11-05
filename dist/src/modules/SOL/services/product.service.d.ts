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
