import { Model } from "mongoose";
import { EndPointsModel } from "../models/endpoints.model";
import { EndPointsInterface } from "../interfaces/endpoits.interface";
export declare class EndPointsRepository {
    private readonly _model;
    constructor(_model: Model<EndPointsModel>);
    register(dto: EndPointsInterface): Promise<EndPointsModel>;
    list(): Promise<EndPointsModel[]>;
    getById(_id: string): Promise<EndPointsModel>;
    update(_id: string, dto: EndPointsInterface): Promise<EndPointsModel>;
    deleteById(_id: string): Promise<EndPointsModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getByEndpointType(endpointType: string): Promise<EndPointsModel>;
}
