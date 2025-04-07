import { ApiProperty } from "@nestjs/swagger";
import { BidStatusEnum } from "../enums/bid-status.enum";
import { UserInterface } from "../interfaces/user.interface";
import { AllotmentStatusEnum } from "../enums/allotment-status.enum";

export abstract class BidUpdateStatusRequestDto {
  @ApiProperty({ type: String, enum: BidStatusEnum })
  status: BidStatusEnum;

  @ApiProperty({ type: String, required: false })
  declined_reason: string;

  proofreader: UserInterface;

  @ApiProperty({ type: String, required: false })
  allomentStatus: AllotmentStatusEnum;
}
