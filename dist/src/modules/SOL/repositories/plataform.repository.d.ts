import { Model } from "mongoose";
import { BidModel } from "../models/bid.model";
import { BidDateUpdateDto } from "../dtos/bid-date-update.dto";
import { PlataformModel } from "../models/plataform.model";
export declare class PlataformRepository {
    private readonly _model;
    constructor(_model: Model<BidModel>);
    register(dto: BidDateUpdateDto): Promise<PlataformModel>;
    findOne(): Promise<PlataformModel>;
    update(_id: string, dto: BidDateUpdateDto): Promise<PlataformModel>;
}
