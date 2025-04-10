import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
export class UserResetPasswordRequestDto {
  @ApiProperty({ type: String })
  @IsEmail({}, { message: "Email inválido" })
  email: string;
}
