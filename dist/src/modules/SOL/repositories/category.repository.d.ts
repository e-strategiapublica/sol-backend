import { Model } from "mongoose";
import { CategoryModel } from "../models/category.model";
import { CategoryRegisterDto } from "../dtos/category-register-request.dto";
export declare class CategoryRepository {
    private readonly _model;
    constructor(_model: Model<CategoryModel>);
    register(dto: CategoryRegisterDto): Promise<any>;
    update(_id: string, dto: CategoryRegisterDto): Promise<CategoryModel>;
    list(): Promise<CategoryModel[]>;
    getById(_id: string): Promise<CategoryModel>;
    getByIdentifier(identifier: number): Promise<CategoryModel>;
    deleteById(_id: string): Promise<CategoryModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    listByIds(ids: string[]): Promise<CategoryModel[]>;
}
