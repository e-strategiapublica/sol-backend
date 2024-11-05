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
