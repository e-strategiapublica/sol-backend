import { HttpStatus, INestApplication } from "@nestjs/common";
import { AgreementRegisterRequestDto } from "src/modules/SOL/dtos/agreement-register-request.dto";
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

export const registerAgreement = async (
  app: INestApplication,
  {
    payload,
    token,
    expectedStatus = HttpStatus.OK,
  }: {
    payload: AgreementRegisterRequestDto;
    token: string;
    expectedStatus?: HttpStatus;
  },
) => {
  const response = await request(app.getHttpServer())
    .post("/convenios/register")
    .set("Authorization", `Bearer ${token}`)
    .send(payload)
    .expect(expectedStatus);

  return response;
};

export const login = async (
  app: INestApplication,
  {
    payload,
    expectedStatus = HttpStatus.OK,
  }: { payload: string; expectedStatus?: HttpStatus },
) => {
  const response = await request(app.getHttpServer())
    .post("/authentication/authenticate")
    .send({ payload })
    .expect(expectedStatus);

  return response;
};

export const createProject = async (
  app: INestApplication,
  {
    payload,
    token,
    expectedStatus = HttpStatus.OK,
  }: {
    payload: AgreementRegisterRequestDto;
    token: string;
    expectedStatus?: HttpStatus;
  },
) => {
  const response = await request(app.getHttpServer())
    .post("/projetos/register")
    .set("Authorization", `Bearer ${token}`)
    .send(payload)
    .expect(expectedStatus);

  return response;
};
