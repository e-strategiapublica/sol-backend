import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
export class UserResetPasswordRequestDto {
  @ApiProperty({ type: String })
  @IsEmail({}, { message: "Email inválido" })
  email: string;
}
