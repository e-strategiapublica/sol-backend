import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "./user.schema";
import { AgreementStatusEnum } from "../enums/agreement-status.enum";
import { Association } from "./association.schema";
import { WorkPlan } from "./work-plan.schema";
import { AgreementActiveStatusEnum } from "../enums/agreement-active-status";
import { Project } from "./project.schema";

@Schema({ timestamps: true, collection: Agreement.name.toLowerCase() })
export class Agreement {
  @Prop({ required: true, type: String })
  register_number: string;

  @Prop({ required: true, type: String })
  register_object: string;

  @Prop({ required: true, enum: Object.keys(AgreementStatusEnum) })
  status: AgreementStatusEnum;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  states: string;

  @Prop({ required: true, type: Number })
  value: number;

  @Prop({ required: true, type: Date })
  signature_date: Date;

  @Prop({ required: true, type: Date })
  validity_date: Date;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Association.name,
  })
  association: Association;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Project.name,
  })
  project: Project;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  manager: User;

  @Prop({
    required: false,
    type: [{ type: mongoose.Types.ObjectId, ref: WorkPlan.name }],
  })
  workPlan: WorkPlan[];

  @Prop({
    required: false,
    enum: Object.keys(AgreementActiveStatusEnum),
    default: AgreementActiveStatusEnum.active,
  })
  activeStatus: AgreementActiveStatusEnum;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  reviewer: User;
}

export const AgreementSchema = SchemaFactory.createForClass(Agreement);
