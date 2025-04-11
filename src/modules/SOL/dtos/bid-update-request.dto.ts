import { ApiProperty } from "@nestjs/swagger";
import { AddressRegisterDto } from "src/shared/dtos/address-register.dto";
import { LegalRepresentativeRegisterDto } from "src/shared/dtos/legal-representative-register.dto";
import { BidTypeEnum } from "../enums/bid-type.enum";
import { BidModalityEnum } from "../enums/bid-modality.enum";
import { AllotmentRequestDto } from "./allotment-request.dto";
import { User } from "../schemas/user.schema";
import { UserRegisterRequestDto } from "./user-register-request.dto";
import { BidStatusEnum } from "../enums/bid-status.enum";
import { AgreementInterface } from "../interfaces/agreement.interface";
import { Supplier } from "../schemas/supplier.schema";

export abstract class BidUpdateDto {
  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  agreementId: string;

  @ApiProperty({ type: String })
  classification: string;

  @ApiProperty({ type: String })
  start_at: string;

  @ApiProperty({ type: String })
  end_at: string;

  @ApiProperty({ type: String })
  bid_type: string;

  @ApiProperty({ type: String })
  days_to_delivery: string;

  @ApiProperty({ type: String })
  days_to_tiebreaker: string;

  @ApiProperty({ type: String })
  local_to_delivery: string;

  @ApiProperty({ type: String, enum: BidStatusEnum })
  status: BidStatusEnum;

  @ApiProperty({ type: String })
  aditional_site: string;

  @ApiProperty({ type: [AllotmentRequestDto] })
  add_allotment: AllotmentRequestDto[];

  @ApiProperty({ type: Supplier })
  invited_suppliers: Supplier[];

  agreement: AgreementInterface;
}
