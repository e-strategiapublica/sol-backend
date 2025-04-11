import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsString,
  Matches,
  MinLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Transform } from "class-transformer";

@ValidatorConstraint({ name: "isFiveDigitCode", async: false })
class IsFiveDigitCodeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return /^\d{5}$/.test(String(value));
  }

  defaultMessage() {
    return "Código deve conter 5 números!";
  }
}
export class UserResetPasswordConfirmationRequestDto {
  @ApiProperty({ type: String })
  @IsEmail({}, { message: "Email inválido" })
  email: string;

  @ApiProperty({ type: Number })
  @Validate(IsFiveDigitCodeConstraint)
  @Transform(({ value }) => parseInt(value, 10))
  code: number;

  @IsString({ message: "Senha é obrigatória!" })
  @MinLength(8, { message: "Senha deve conter no mínimo 8 caracteres!" })
  @ApiProperty({ type: String })
  newPassword: string;
}
