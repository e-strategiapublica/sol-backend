import { HttpStatus, INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { UserResetPasswordRequestDto } from "src/modules/SOL/dtos/user-reset-password-request.dto";
import { firstAccessRequest } from "tests/utils/common.request";
let app: INestApplication;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

afterEach(async () => {
  await app.close();
});

describe("POST 'user/first-access'", () => {
  it("should be throw not found, because email not found in database", async () => {
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

  it("throw bad request when send invalid body", async () => {
    const response = await firstAccessRequest(app, {
      payload: {} as UserResetPasswordRequestDto,
      expectedStatus: HttpStatus.BAD_REQUEST,
    });

    expect(response.body).toEqual({
      success: false,
      data: null,
      errors: ["Email não encontrado!"],
    });
  });
});
