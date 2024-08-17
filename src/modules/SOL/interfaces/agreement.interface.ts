import mongoose from "mongoose";
import { AgreementStatusEnum } from "../enums/agreement-status.enum";
import { AssociationModel } from "../models/association.model";
import { ProjectModel } from "../models/project.model";
import { UserModel } from "../models/user.model";
import { WorkPlanModel } from "../models/work-plan.model";
import { ItemsInterfaceWithId } from "./items.interface";

export interface AgreementInterface {
  register_number: string;
  register_object: string;
  status: AgreementStatusEnum;
  city: string;
  states: string;
  value: number;
  validity_date: Date;
  signature_date: Date;
  association: AssociationModel;
  project: ProjectModel;
  manager: UserModel;
  workPlan: WorkPlanModel[];
  project_id: ProjectModel;
  reviewer: UserModel;
}


export interface AgreementInterfaceWithId extends AgreementInterface {
  _id?: mongoose.Types.ObjectId; // Make sure to import mongoose
}


export interface WorkPlanInterface {
  name: string;
  product: Array<{ quantity: string; unitValue: number; items: ItemsInterfaceWithId }>;
}
