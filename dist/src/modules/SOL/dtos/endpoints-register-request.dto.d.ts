import { EndPointsStatusEnum } from "../enums/endpoints-status.enum";
import { EndPointsTypeEnum } from "../enums/endpoints-type.enum";
export declare abstract class EndPointsRegisterRequestDto {
    endpointPath: string;
    token: string;
    frequency: string;
    lastRun: Date;
    status: EndPointsStatusEnum;
    endpointType: EndPointsTypeEnum;
}
