import mongoose from "mongoose";
import { EndPointsStatusEnum } from "../enums/endpoints-status.enum";
import { EndPointsTypeEnum } from "../enums/endpoints-type.enum";
export declare class EndPoints {
    endpointPath: string;
    token: string;
    frequency: string;
    lastRun: Date;
    status: EndPointsStatusEnum;
    endpointType: EndPointsTypeEnum;
    messageError: string;
}
export declare const EndPointsSchema: mongoose.Schema<EndPoints, mongoose.Model<EndPoints, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, EndPoints>;
