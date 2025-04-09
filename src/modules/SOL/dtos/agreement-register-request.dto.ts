import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../models/user.model";
import { AgreementStatusEnum } from "../enums/agreement-status.enum";
import { WorkPlanModel } from "../models/work-plan.model";
import { AssociationModel } from "../models/association.model";
import { ProjectModel } from "../models/project.model";

export abstract class AgreementRegisterRequestDto {
  @ApiProperty({ required: true, type: String })
  register_number: string;

  @ApiProperty({ required: true, type: String })
  register_object: string;

  @ApiProperty({ required: true, enum: Object.keys(AgreementStatusEnum) })
  status: AgreementStatusEnum;

  @ApiProperty({ required: true, type: String })
  city: string;

  @ApiProperty({ required: true, type: String })
  states: string;

  @ApiProperty({ required: true, type: Number })
  value: number;

  @ApiProperty({ required: true, type: Date })
  signature_date: Date;

  @ApiProperty({ required: true, type: Date })
  validity_date: Date;

  @ApiProperty({ required: false, type: String })
  associationId: string;

  @ApiProperty({ required: false, type: String })
  projectId: string;

  @ApiProperty({ required: false, type: String })
  reviewer: string;

  @ApiProperty({ required: false, type: String })
  manager: string;
  association: AssociationModel;
  project: ProjectModel;
}
