import { AgreementActiveStatusEnum } from "../enums/agreement-active-status";
import { LegalRepresentative } from "src/shared/schemas/legal-representative.schema";
import { User } from "../schemas/user.schema";
export declare abstract class ProjectRegisterRequestDto {
    name: string;
    project_manager: string;
    agreement: string[];
    agreement_list?: string[];
    activeStatus: AgreementActiveStatusEnum.active;
    legal_representative: LegalRepresentative;
    viewer_list: User[];
    reviewer_list: User[];
}
