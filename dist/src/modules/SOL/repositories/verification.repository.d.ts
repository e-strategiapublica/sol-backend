import { Model } from "mongoose";
import { VerificationModel } from "../models/verification.model";
import { VerificationRegisterRequestDto } from "../dtos/vertification-register-request.dto";
import { UserModel } from "../models/user.model";
export declare class VerificationRepository {
    private readonly model;
    private readonly logger;
    constructor(model: Model<VerificationModel>);
    save(dto: VerificationRegisterRequestDto): Promise<VerificationModel>;
    getById(id: string): Promise<VerificationModel>;
    getByUser(user: UserModel): Promise<VerificationModel>;
    delete(id: string): Promise<VerificationModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    incrementAttempt(_id: string, attempt: number): Promise<VerificationModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
