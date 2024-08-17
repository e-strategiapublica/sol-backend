import { ItemsService } from "../services/items.service";
import { ItemsModel } from "../models/database/items.model";
export declare class ItemsController {
    private readonly itemsService;
    private readonly itemsModel;
    constructor(itemsService: ItemsService, itemsModel: ItemsModel);
    list(): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    register(dto: any): Promise<{
        type: string;
    }>;
    deleteById(_id: string): Promise<{
        type: string;
    }>;
    update(id: string, dto: any): Promise<{
        type: string;
    }>;
    getById(_id: string): Promise<any>;
}
