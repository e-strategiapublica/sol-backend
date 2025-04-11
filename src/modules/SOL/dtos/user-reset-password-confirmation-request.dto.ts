import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class UserResetPasswordConfirmationRequestDto {
  @ApiProperty({ type: String })
  @IsEmail({}, { message: "Email inválido" })
  email: string;

  @ApiProperty({ type: Number })
  @IsString({ message: "Código deve ser uma string númerica!" })
  @Matches(/^\d{5}$/, { message: "Código deve conter 5 números!" })
  @Transform(({ value }) => parseInt(value, 10))
  code: number;

  @IsString({ message: "Senha é obrigatória!" })
  @MinLength(8, { message: "Senha deve conter no mínimo 8 caracteres!" })
  @ApiProperty({ type: String })
  newPassword: string;
}
