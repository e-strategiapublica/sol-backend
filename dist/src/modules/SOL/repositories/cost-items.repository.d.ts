import { CostItemsModel } from "../models/cost-items.model";
import { Model } from "mongoose";
import { CostItemsRegisterRequestDto } from "../dtos/cost-items-register-request.dto";
import { CostItemsUpdateRequestDto } from "../dtos/cost-items-update-request.dto";
export declare class CostItemsRepository {
    private readonly _model;
    constructor(_model: Model<CostItemsModel>);
    register(dto: CostItemsRegisterRequestDto): Promise<CostItemsModel>;
    list(): Promise<CostItemsModel[]>;
    getById(_id: string): Promise<CostItemsModel>;
    update(_id: string, dto: CostItemsUpdateRequestDto): Promise<CostItemsModel[]>;
    deleteById(_id: string): Promise<CostItemsModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    listByIds(ids: string[]): Promise<Omit<Omit<CostItemsModel & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    getByName(name: string): Promise<CostItemsModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
