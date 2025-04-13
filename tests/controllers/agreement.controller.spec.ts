import * as bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { UserResetPasswordRequestDto } from "src/modules/SOL/dtos/user-reset-password-request.dto";
import {
  firstAccessRequest,
  registerAgreement,
  resetPasswordConfirmation,
} from "tests/utils/common.request";
import { getConnectionToken, getModelToken } from "@nestjs/mongoose";
import { User } from "src/modules/SOL/schemas/user.schema";
import { UserStatusEnum } from "src/modules/SOL/enums/user-status.enum";
import { UserTypeEnum } from "src/modules/SOL/enums/user-type.enum";
import { Verification } from "src/modules/SOL/schemas/verification.schema";
import { Model, Types } from "mongoose";
let app: INestApplication;
import { SENDGRID_TOKEN } from "@ntegral/nestjs-sendgrid"; // importe o token correto
import { UnprocessableEntityException } from "src/shared/exceptions/unprocessable-entity.exception";
import { UserResetPasswordConfirmationRequestDto } from "src/modules/SOL/dtos/user-reset-password-confirmation-request.dto";
import { AgreementRegisterRequestDto } from "src/modules/SOL/dtos/agreement-register-request.dto";
import { simulateLogin } from "tests/utils/massa.utils";
import { UserRolesEnum } from "src/modules/SOL/enums/user-roles.enum";
import { AgreementStatusEnum } from "src/modules/SOL/enums/agreement-status.enum";

describe("Agreement Controller", () => {
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

  describe("POST 'convenios/register'", () => {
    const invalidPayloadCases = [
      {
        description: "empty payload",
        payload: {} as AgreementRegisterRequestDto,
        expectedErrors: [
          "Número de registro é obrigatório.",
          "Número de registro deve ser uma string.",
          "Objeto do registro é obrigatório.",
          "Objeto do registro deve ser uma string.",
          "Status inválido.",
          "Cidade é obrigatória.",
          "Cidade deve ser uma string.",
          "Estado é obrigatório.",
          "Estado deve ser uma string.",
          "Valor deve ser numérico.",
          "Data de assinatura inválida.",
          "Data de validade inválida.",
          "associationId deve ser um id válido.",
          "projectId deve ser um id válido.",
          "reviewer deve ser um id válido.",
        ],
      },
      {
        description: "parcial payload",
        payload: {
          register_number: "00001/2025",
          register_object: "Novo Convenio",
          states: "BA",
          city: "Abaíra",
          value: 570300,
          signature_date: "2025-04-10",
          validity_date: "2025-04-12",
          status: "canceled",
          associationId: "67f8fecbb1903970f05bfd99",
          projectId: "",
          reviewer: "",
        } as any,
        expectedErrors: [
          "projectId deve ser um id válido.",
          "reviewer deve ser um id válido.",
        ],
      },
    ];
    it.each(invalidPayloadCases)(
      "throw BAD REQUEST when send invalid body ($description)",
      async ({
        payload,
        expectedErrors,
      }: {
        payload: AgreementRegisterRequestDto;
        expectedErrors: string[];
      }) => {
        const { token } = await simulateLogin(
          app,
          UserRolesEnum.gerente_geral_projetos,
          UserTypeEnum.project_manager,
        );
        const response = await registerAgreement(app, {
          payload,
          token,
          expectedStatus: HttpStatus.UNPROCESSABLE_ENTITY,
        });

        expect(response.body).toEqual({
          success: false,
          data: null,
          errors: expectedErrors,
        });
      },
    );

    it("should be Not Found, because not found project", async () => {
      const { token } = await simulateLogin(
        app,
        UserRolesEnum.gerente_geral_projetos,
        UserTypeEnum.project_manager,
      );
      const response = await registerAgreement(app, {
        payload: {
          city: "Abaíra",
          states: "BA",
          register_number: "00001/2025",
          register_object: "Novo Convenio",
          status: AgreementStatusEnum.inExecution,
          associationId: new Types.ObjectId().toString(),
          projectId: new Types.ObjectId().toString(),
          reviewer: new Types.ObjectId().toString(),
          signature_date: new Date("2025-04-10"),
          validity_date: new Date("2025-04-12"),
          value: 570300,
        },
        token,
        expectedStatus: HttpStatus.NOT_FOUND,
      });

      expect(response.body).toEqual({
        success: false,
        data: null,
        errors: ["Projeto não encontrado"],
      });
    });

    it.only("should be Not Found, because not found association", async () => {
      const { token } = await simulateLogin(
        app,
        UserRolesEnum.gerente_geral_projetos,
        UserTypeEnum.project_manager,
      );
      const response = await registerAgreement(app, {
        payload: {
          city: "Abaíra",
          states: "BA",
          register_number: "00001/2025",
          register_object: "Novo Convenio",
          status: AgreementStatusEnum.inExecution,
          associationId: new Types.ObjectId().toString(),
          projectId: new Types.ObjectId().toString(),
          reviewer: new Types.ObjectId().toString(),
          signature_date: new Date("2025-04-10"),
          validity_date: new Date("2025-04-12"),
          value: 570300,
        },
        token,
        expectedStatus: HttpStatus.NOT_FOUND,
      });

      expect(response.body).toEqual({
        success: false,
        data: null,
        errors: ["Projeto não encontrado"],
      });
    });
  });
});
