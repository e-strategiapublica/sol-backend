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
