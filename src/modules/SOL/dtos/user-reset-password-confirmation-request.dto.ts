import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsString, Min, MinLength } from "class-validator";

export class UserResetPasswordConfirmationRequestDto {
  @ApiProperty({ type: String })
  @IsEmail({}, { message: "Email inválido" })
  email: string;

  @ApiProperty({ type: Number })
  @IsInt({ message: "Código é obrigatório!" })
  @Min(10000, { message: "Código deve conter 5 números!" })
  code: number;

  @IsString({ message: "Senha é obrigatória!" })
  @MinLength(8, { message: "Senha deve conter no mínimo 8 caracteres!" })
  @ApiProperty({ type: String })
  newPassword: string;
}
