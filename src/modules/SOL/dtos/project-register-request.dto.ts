import { ApiProperty } from "@nestjs/swagger";
import { AgreementActiveStatusEnum } from "../enums/agreement-active-status";
import { AgreementInterface } from "../interfaces/agreement.interface";
import { AgreementRegisterRequestDto } from "./agreement-register-request.dto";
import { LegalRepresentativeRegisterDto } from "src/shared/dtos/legal-representative-register.dto";
import { LegalRepresentative } from "src/shared/schemas/legal-representative.schema";
import { User } from "../schemas/user.schema";
import { ArrayMinSize, IsString, Min } from "class-validator";
import { IsObjectId } from "src/shared/decorators/class-validator/isObjectId.decorator";

export class ProjectRegisterRequestDto {
  @ApiProperty({ required: true, type: String })
  @IsString({ message: "Nome do projeto é obrigatório." })
  name: string;

  @ApiProperty({ required: true, type: String })
  @IsObjectId()
  project_manager: string;

  @ApiProperty({ type: LegalRepresentativeRegisterDto })
  legal_representative: LegalRepresentative;

  @ArrayMinSize(1, {
    message: "Lista de visualizador deve ter pelo menos um visualizador.",
  })
  viewer_list: User[];

  @ArrayMinSize(1, {
    message: "Lista de revisor deve ter pelo menos um revisor.",
  })
  reviewer_list: User[];
}
