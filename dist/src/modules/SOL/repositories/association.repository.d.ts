import { AssociationModel } from "../models/association.model";
import { Model } from "mongoose";
import { AssociationUpdateRequestDto } from "../dtos/association-update-request.dto";
export declare class AssociationRepository {
    private readonly _model;
    constructor(_model: Model<AssociationModel>);
    register(dto: any): Promise<AssociationModel>;
    update(_id: string, dto: AssociationUpdateRequestDto): Promise<AssociationModel>;
    list(): Promise<AssociationModel[]>;
    getById(_id: string): Promise<AssociationModel>;
    deleteById(_id: string): Promise<AssociationModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getByCnpj(cnpj: string): Promise<AssociationModel>;
}
