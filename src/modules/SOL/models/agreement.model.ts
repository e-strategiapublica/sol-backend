import { Document, Types } from "mongoose";
import { AgreementInterface } from "../interfaces/agreement.interface";

export interface AgreementModel extends AgreementInterface, Document {
  _id: Types.ObjectId;
}
