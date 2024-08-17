import * as mongoose from 'mongoose';
import { User } from "./user.schema";
export declare class Verification {
    attempt: number;
    deadline: string;
    user: User;
    code: number;
}
export declare const VerificationSchema: mongoose.Schema<Verification, mongoose.Model<Verification, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Verification>;
