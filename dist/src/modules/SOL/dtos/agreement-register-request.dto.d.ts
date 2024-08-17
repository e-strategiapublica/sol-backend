import { AgreementStatusEnum } from "../enums/agreement-status.enum";
import { AssociationModel } from "../models/association.model";
import { ProjectModel } from "../models/project.model";
export declare abstract class AgreementRegisterRequestDto {
    register_number: string;
    register_object: string;
    status: AgreementStatusEnum;
    city: string;
    states: string;
    value: number;
    signature_date: Date;
    validity_date: Date;
    associationId: string;
    projectId: string;
    reviewer: string;
    manager: string;
    association: AssociationModel;
    project: ProjectModel;
}
