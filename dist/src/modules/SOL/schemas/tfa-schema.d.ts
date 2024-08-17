import * as mongoose from 'mongoose';
import { User } from "./user.schema";
export declare class Tfa {
    secret: string;
    url: string;
    user: User;
}
export declare const TfaSchema: mongoose.Schema<Tfa, mongoose.Model<Tfa, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Tfa>;
