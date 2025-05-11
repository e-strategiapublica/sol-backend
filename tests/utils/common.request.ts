import { HttpStatus, INestApplication } from "@nestjs/common";
import { AuthenticateRequestDto } from "src/modules/SOL/dtos/authenticate-request.dto";
import { UserResetPasswordConfirmationRequestDto } from "src/modules/SOL/dtos/user-reset-password-confirmation-request.dto";
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

export const resetPasswordConfirmation = async (
  app: INestApplication,
  {
    payload,
    expectedStatus = HttpStatus.OK,
  }: {
    payload: UserResetPasswordConfirmationRequestDto;
    expectedStatus?: HttpStatus;
  },
) => {
  const response = await request(app.getHttpServer())
    .put("/user/reset-password-confirmation")
    .send(payload)
    .expect(expectedStatus);

  return response;
};

export const loginRequest = async (
  app: INestApplication,
  {
    payload,
    expectedStatus = HttpStatus.OK,
  }: {
    payload: string;
    expectedStatus?: HttpStatus;
  },
) => {
  const response = await request(app.getHttpServer())
    .post("/authentication/authenticate")
    .send({ payload })
    .expect(expectedStatus);

  return response;
};

export const createDocumentRequest = async (
  app: INestApplication,
  {
    payload,
    token,
    expectedStatus = HttpStatus.OK,
  }: {
    payload: { _id: string; language: string; type: string };
    token: string;
    expectedStatus?: HttpStatus;
  },
) => {
  const { _id, language, type } = payload;
  const response = await request(app.getHttpServer())
    .get(`/bid/create-document/${_id}/${language}/${type}`)
    .set("Authorization", token)
    .send({ payload })
    .expect(expectedStatus);

  return response;
};
