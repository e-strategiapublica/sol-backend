import { HttpStatus, INestApplication } from "@nestjs/common";
import { UserResetPasswordRequestDto } from "src/modules/SOL/dtos/user-reset-password-request.dto";
import * as request from "supertest";

export const firstAccessRequest = async (
  app: INestApplication,
  {
    payload,
    expectedStatus = HttpStatus.OK,
  }: { payload: UserResetPasswordRequestDto; expectedStatus?: HttpStatus },
) => {
  const response = await request(app.getHttpServer())
    .post("/user/first-access")
    .send(payload)
    .expect(expectedStatus);

  return response;
};
