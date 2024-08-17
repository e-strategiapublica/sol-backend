import { ProposalStatusEnum } from "../enums/proposal-status.enum";
import { UserModel } from "../models/user.model";
export declare abstract class ProposalAcceptedRequestDto {
    status: ProposalStatusEnum;
    acceptBy: UserModel;
    acceptAt: Date;
}
