import { faker } from "@faker-js/faker";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { UserResetPasswordRequestDto } from "src/modules/SOL/dtos/user-reset-password-request.dto";
import { firstAccessRequest } from "tests/utils/common.request";
import { getConnectionToken, getModelToken } from "@nestjs/mongoose";
import { User } from "src/modules/SOL/schemas/user.schema";
import { UserStatusEnum } from "src/modules/SOL/enums/user-status.enum";
import { UserTypeEnum } from "src/modules/SOL/enums/user-type.enum";
import { Verification } from "src/modules/SOL/schemas/verification.schema";
import mongoose, { Model } from "mongoose";
import { SendGridService } from "@ntegral/nestjs-sendgrid";
let app: INestApplication;
import { SENDGRID_TOKEN } from "@ntegral/nestjs-sendgrid"; // importe o token correto
import { UnprocessableEntityException } from "src/shared/exceptions/unprocessable-entity.exception";

describe("UserController", () => {
  const sendMock = jest.fn();
  const mockSendGridService = {
    send: sendMock,
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SENDGRID_TOKEN)
      .useValue(mockSendGridService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        exceptionFactory: (validationErrors = []) => {
          return new UnprocessableEntityException(validationErrors);
        },
      }),
    );

    await app.init();
  });

  afterEach(() => {
    sendMock.mockReset();
  });

  afterAll(async () => {
    const connection = app.get(getConnectionToken()); // Mongoose connection
    await connection.close();

    await app.close();
  });

  describe("POST 'user/first-access'", () => {
    it("should be throw NOT FOUND, because email not found in database", async () => {
      const response = await firstAccessRequest(app, {
        payload: {
          email: "teste@teste.com",
        },
        expectedStatus: HttpStatus.NOT_FOUND,
      });

      expect(response.body).toEqual({
        success: false,
        data: null,
        errors: ["Email não encontrado!"],
      });
    });

    it("should be throw BAD REQUEST, because user is active", async () => {
      const userModel = app.get(getModelToken(User.name));
      const email = faker.internet.email();
      await userModel.create({
        name: faker.person.fullName(),
        email,
        status: UserStatusEnum.active,
        type: UserTypeEnum.fornecedor,
      });
      const response = await firstAccessRequest(app, {
        payload: {
          email,
        },
        expectedStatus: HttpStatus.BAD_REQUEST,
      });

      expect(response.body).toEqual({
        success: false,
        data: null,
        errors: ["Você já realizou o primeiro acesso!"],
      });
    });

    it("should throw UNAUTHORIZED because a verification already exists and is still valid", async () => {
      const userModel = app.get(getModelToken(User.name));
      const email = faker.internet.email();
      const user = await userModel.create({
        name: faker.person.fullName(),
        email,
        status: UserStatusEnum.inactive,
        type: UserTypeEnum.fornecedor,
      });

      const verificationModel = app.get<Model<Verification>>(
        getModelToken(Verification.name),
      );
      await verificationModel.create({
        user,
        code: faker.string.numeric(6),
        attempt: 0,
        deadline: new Date(Date.now() + 1000 * 60 * 60),
      });
      const response = await firstAccessRequest(app, {
        payload: {
          email,
        },
        expectedStatus: HttpStatus.UNAUTHORIZED,
      });

      expect(response.body).toEqual({
        success: false,
        data: null,
        errors: ["Um código já foi enviado e está válido!"],
      });
    });

    it("should be SUCCESSFULLY sent the email, recreating verification", async () => {
      const userModel = app.get<Model<User>>(getModelToken(User.name));
      const email = faker.internet.email();
      const user = await userModel.create({
        name: faker.person.fullName(),
        email,
        status: UserStatusEnum.inactive,
        type: UserTypeEnum.fornecedor,
      });

      const verificationModel = app.get<Model<Verification>>(
        getModelToken(Verification.name),
      );
      const verification = await verificationModel.create({
        user,
        code: faker.string.numeric(6),
        attempt: 0,
        deadline: new Date(Date.now() - 1000 * 60 * 60),
      });

      const response = await firstAccessRequest(app, {
        payload: {
          email,
        },
        expectedStatus: HttpStatus.OK,
      });

      expect(response.body).toEqual({
        success: true,
        data: {
          email,
        },
      });

      const verificationDeleted = await verificationModel.findById(
        verification._id.toString(),
      );

      expect(verificationDeleted).toBeNull();

      const verificationCreated = await verificationModel.findOne({
        user: user._id.toString(),
      });

      expect(sendMock).toHaveBeenCalledWith({
        from: expect.any(String),
        html: `Olá ${user.name}, foi solicitado o código de primeiro acesso! <br> Código: <b>${verificationCreated.code.toString()}</b>`,
        subject: "LACCHAIN - Primeiro Acesso",
        text: "LACCHAIN - Primeiro Acesso",
        to: user.email,
      });
      expect(sendMock).toHaveBeenCalledTimes(1);
    });

    it("should be SUCCESSFULLY sent the email, creating a verification", async () => {
      const userModel = app.get<Model<User>>(getModelToken(User.name));
      const email = faker.internet.email();
      const user = await userModel.create({
        name: faker.person.fullName(),
        email,
        status: UserStatusEnum.inactive,
        type: UserTypeEnum.fornecedor,
      });

      const verificationModel = app.get<Model<Verification>>(
        getModelToken(Verification.name),
      );

      const response = await firstAccessRequest(app, {
        payload: {
          email,
        },
        expectedStatus: HttpStatus.OK,
      });

      expect(response.body).toEqual({
        success: true,
        data: {
          email,
        },
      });

      const verificationCreated = await verificationModel.findOne({
        user: user._id.toString(),
      });

      expect(sendMock).toHaveBeenCalledWith({
        from: expect.any(String),
        html: `Olá ${user.name}, foi solicitado o código de primeiro acesso! <br> Código: <b>${verificationCreated.code.toString()}</b>`,
        subject: "LACCHAIN - Primeiro Acesso",
        text: "LACCHAIN - Primeiro Acesso",
        to: user.email,
      });
      expect(sendMock).toHaveBeenCalledTimes(1);
    });

    it("throw BAD REQUEST when send invalid body", async () => {
      const response = await firstAccessRequest(app, {
        payload: {} as UserResetPasswordRequestDto,
        expectedStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      });

      expect(response.body).toEqual({
        success: false,
        data: null,
        errors: ["Email inválido"],
      });
    });

    it("validates that when an error occurs while sending the email", async () => {
      const userModel = app.get<Model<User>>(getModelToken(User.name));
      const email = faker.internet.email();
      await userModel.create({
        name: faker.person.fullName(),
        email,
        status: UserStatusEnum.inactive,
        type: UserTypeEnum.fornecedor,
      });

      sendMock.mockRejectedValueOnce(new Error("Email sending error"));

      const response = await firstAccessRequest(app, {
        payload: {
          email,
        },
        expectedStatus: HttpStatus.BAD_GATEWAY,
      });

      expect(response.body).toEqual({
        success: false,
        data: null,
        errors: ["Erro ao enviar email, tente novamente mais tarde!"],
      });
    });
  });
});
