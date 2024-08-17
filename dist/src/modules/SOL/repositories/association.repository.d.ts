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
