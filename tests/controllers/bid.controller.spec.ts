import { faker } from "@faker-js/faker";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import {
  createDocumentRequest,
  firstAccessRequest,
} from "tests/utils/common.request";
import { getConnectionToken, getModelToken } from "@nestjs/mongoose";
import { User } from "src/modules/SOL/schemas/user.schema";
import { UserStatusEnum } from "src/modules/SOL/enums/user-status.enum";
import { UserTypeEnum } from "src/modules/SOL/enums/user-type.enum";
import { Verification } from "src/modules/SOL/schemas/verification.schema";
import { Model } from "mongoose";
import { SENDGRID_TOKEN } from "@ntegral/nestjs-sendgrid";
import { UnprocessableEntityException } from "src/shared/exceptions/unprocessable-entity.exception";
import {
  setupLogin,
  prepareToTestCreateDocument,
} from "tests/utils/massa.utils";
import { ModelContractClassificationEnum } from "src/modules/SOL/enums/modelContract-classification.enum";
import * as request from "supertest";

describe("Bid Controller", () => {
  let app: INestApplication;
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
    const connection = app.get(getConnectionToken());
    await connection.close();
    await app.close();
  });

  describe("GET 'create-document/:_id/:language/:type'", () => {
    it.only("should export a document PDF", async () => {
      // First, prepare all the necessary models in the database
      const { bidId } = await prepareToTestCreateDocument(
        app,
        "portuguese",
        ModelContractClassificationEnum.bens,
      );

      // Get authentication token
      const { token } = await setupLogin(app);

      // Make the request to the create-document endpoint
      try {
        const response = await createDocumentRequest(app, {
          payload: {
            _id: bidId,
            language: "portuguese",
            type: "bens",
          },
          token,
          expectedStatus: HttpStatus.OK,
        });

        // Verify the response
        expect(response.body).toBeDefined();
        expect(response.body.success).toBe(true);
      } catch (error) {
        console.error("Error details:", error.response?.body);
        throw error;
      }
    });

    it("should handle different document types", async () => {
      // Prepare models for a different document type
      const { bidId } = await prepareToTestCreateDocument(
        app,
        "portuguese",
        ModelContractClassificationEnum.servicos,
      );

      // Get authentication token
      const { token } = await setupLogin(app);

      // Make the request to the create-document endpoint
      const response = await request(app.getHttpServer())
        .get(`/bid/create-document/${bidId}/portuguese/servicos`)
        .set("Authorization", token)
        .expect(200);

      // Verify the response
      expect(response.body).toBeDefined();
      expect(response.body.success).toBe(true);
    });

    it("should handle different languages", async () => {
      // Prepare models for a different language
      const { bidId } = await prepareToTestCreateDocument(
        app,
        "english",
        ModelContractClassificationEnum.bens,
      );

      // Get authentication token
      const { token } = await setupLogin(app);

      // Make the request to the create-document endpoint
      const response = await request(app.getHttpServer())
        .get(`/bid/create-document/${bidId}/english/bens`)
        .set("Authorization", token)
        .expect(200);

      // Verify the response
      expect(response.body).toBeDefined();
      expect(response.body.success).toBe(true);
    });
  });
});
