import { ClassesService } from "../services/classes.service";
import { ClassesModel } from "../models/database/classes.model";
export declare class ClassesController {
    private readonly classesService;
    private readonly classesModel;
    constructor(classesService: ClassesService, classesModel: ClassesModel);
    list(): Promise<import("bson").Document[]>;
    register(dto: any): Promise<{
        type: string;
    }>;
    update(id: string, dto: any): Promise<{
        type: string;
    }>;
    deleteById(_id: string): Promise<{
        type: string;
    }>;
}
