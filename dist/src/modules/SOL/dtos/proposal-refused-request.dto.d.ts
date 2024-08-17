import { ProposalStatusEnum } from "../enums/proposal-status.enum";
import { UserModel } from "../models/user.model";
import { ProposalNotificationInterface } from "../interfaces/proposal-notification-dto";
export declare abstract class ProposalRefusedRequestDto {
    refusedBecaused: string;
    refusedAt: Date;
    data: ProposalNotificationInterface;
    status: ProposalStatusEnum;
    refusedBy: UserModel;
}
