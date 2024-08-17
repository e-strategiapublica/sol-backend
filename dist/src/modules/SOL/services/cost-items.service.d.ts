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
import { CostItemsRegisterRequestDto } from "../dtos/cost-items-register-request.dto";
import { CostItemsModel } from "../models/cost-items.model";
import { CostItemsRepository } from "../repositories/cost-items.repository";
import { CostItemsUpdateRequestDto } from "../dtos/cost-items-update-request.dto";
import { CategoryRepository } from "../repositories/category.repository";
import { ProductRepository } from "../repositories/product.repository";
import { AgreementRepository } from "../repositories/agreement.repository";
import { ItemsModel } from "../models/database/items.model";
export declare class CostItemsService {
    private _constItemsRepository;
    private _categoryRepository;
    private _productRepository;
    private _agremmentRepository;
    private readonly itemsModel;
    private readonly _logger;
    constructor(_constItemsRepository: CostItemsRepository, _categoryRepository: CategoryRepository, _productRepository: ProductRepository, _agremmentRepository: AgreementRepository, itemsModel: ItemsModel);
    register(dto: CostItemsRegisterRequestDto): Promise<CostItemsModel>;
    list(): Promise<CostItemsModel[]>;
    listByIds(ids: string[]): Promise<CostItemsModel[]>;
    getById(_id: string): Promise<CostItemsModel>;
    getByProjectManagerId(_id: string): Promise<CostItemsModel[]>;
    update(_id: string, dto: CostItemsUpdateRequestDto): Promise<CostItemsModel[]>;
    deleteById(_id: string): Promise<CostItemsModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    handlerJob(data: any[]): Promise<void>;
    getByName(name: string): Promise<undefined | CostItemsModel>;
}
