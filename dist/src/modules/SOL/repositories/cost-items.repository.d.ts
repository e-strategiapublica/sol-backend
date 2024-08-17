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
