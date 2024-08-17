import { Model } from "mongoose";
import { TfaRegisterRequestDto } from "../dtos/tfa-register-request.dto";
import { TfaModel } from "../models/tfa.model";
export declare class TfaRepository {
    private readonly _model;
    constructor(_model: Model<TfaModel>);
    save(dto: TfaRegisterRequestDto): Promise<TfaModel>;
    getByUserId(userId: string): Promise<TfaModel>;
    delete(userId: string): Promise<TfaModel>;
}
