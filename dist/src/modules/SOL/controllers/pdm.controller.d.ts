import { PdmService } from "../services/pdm.service";
import { PdmModel } from "../models/database/pdm.model";
import { ItemsModel } from "../models/database/items.model";
export declare class PdmController {
    private readonly pdmService;
    private readonly pdmModel;
    private readonly itemsModel;
    constructor(pdmService: PdmService, pdmModel: PdmModel, itemsModel: ItemsModel);
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
