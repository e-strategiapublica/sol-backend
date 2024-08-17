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
import { CategoryRepository } from "../repositories/category.repository";
import { CategoryModel } from "../models/category.model";
import { CategoryRegisterDto } from "../dtos/category-register-request.dto";
export declare class CategoryService {
    private readonly _categoryRepository;
    private readonly _logger;
    constructor(_categoryRepository: CategoryRepository);
    register(dto: CategoryRegisterDto): Promise<CategoryModel>;
    list(): Promise<CategoryModel[]>;
    update(_id: string, dto: CategoryRegisterDto): Promise<CategoryModel>;
    getById(_id: string): Promise<CategoryModel>;
    deleteById(_id: string): Promise<CategoryModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
