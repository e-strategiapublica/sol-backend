import { BidTypeEnum } from "../enums/bid-type.enum";
import { BidModalityEnum } from "../enums/bid-modality.enum";
import { BidStatusEnum } from "../enums/bid-status.enum";
import { UserInterface } from "./user.interface";
import { AgreementInterface } from "./agreement.interface";
import { AllotmentModel } from "../models/allotment.model";
import { SupplierModel } from "../models/supplier.model";
import { UserModel } from "../models/user.model";
import { AgreementModel } from "../models/agreement.model";

export interface BidInterface {
  readonly description: string;
  readonly agreement: AgreementModel;

  readonly password: string;

  readonly classification?: string;
  readonly start_at?: string;
  readonly end_at: string;
  readonly days_to_tiebreaker: string;
  readonly days_to_delivery: string;
  readonly local_to_delivery: string;
  readonly bid_type?: BidTypeEnum;
  readonly declined_reason?: string;

  readonly modality?: BidModalityEnum;
  readonly aditional_site?: string;
  readonly add_allotment?: AllotmentModel[];
  readonly invited_suppliers?: SupplierModel[];
  readonly bid_count: string;
  readonly editalFile?: string;
  readonly ataFile?: string;
  readonly state?: string;
  readonly city?: string;

  status: BidStatusEnum;

  readonly association: UserModel;

  readonly proofreader?: UserModel;

  readonly additionalDocuments: string[];
  readonly createdAt: Date;
  readonly concludedAt?: Date;
}
