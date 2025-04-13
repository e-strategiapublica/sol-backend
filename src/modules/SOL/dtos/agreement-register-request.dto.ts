import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEnum,
  IsNumber,
  IsDate,
  IsOptional,
  IsNotEmpty,
  MinLength,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { AgreementStatusEnum } from "../enums/agreement-status.enum";
import { IsObjectId } from "src/shared/decorators/class-validator/isObjectId.decorator";

export class AgreementRegisterRequestDto {
  @ApiProperty({ required: true, type: String })
  @IsString({ message: "Número de registro deve ser uma string." })
  @IsNotEmpty({ message: "Número de registro é obrigatório." })
  register_number: string;

  @ApiProperty({ required: true, type: String })
  @IsString({ message: "Objeto do registro deve ser uma string." })
  @IsNotEmpty({ message: "Objeto do registro é obrigatório." })
  register_object: string;

  @ApiProperty({ required: true, enum: AgreementStatusEnum })
  @IsEnum(AgreementStatusEnum, { message: "Status inválido." })
  status: AgreementStatusEnum;

  @ApiProperty({ required: true, type: String })
  @IsString({ message: "Cidade deve ser uma string." })
  @IsNotEmpty({ message: "Cidade é obrigatória." })
  city: string;

  @ApiProperty({ required: true, type: String })
  @IsString({ message: "Estado deve ser uma string." })
  @IsNotEmpty({ message: "Estado é obrigatório." })
  states: string;

  @ApiProperty({ required: true, type: Number })
  @IsNumber({}, { message: "Valor deve ser numérico." })
  value: number;

  @ApiProperty({ required: true, type: Date })
  @Type(() => Date)
  @IsDate({ message: "Data de assinatura inválida." })
  signature_date: Date;

  @ApiProperty({ required: true, type: Date })
  @Type(() => Date)
  @IsDate({ message: "Data de validade inválida." })
  validity_date: Date;

  @ApiProperty({ required: false, type: String })
  @IsObjectId()
  associationId: string;

  @ApiProperty({ required: false, type: String })
  @IsObjectId()
  projectId: string;

  @ApiProperty({ required: false, type: String })
  @IsObjectId()
  reviewer: string;

  @ApiProperty({ required: false, type: String })
  manager?: string;
}
