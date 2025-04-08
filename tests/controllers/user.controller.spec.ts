import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
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

describe("first test", () => {
  it("should be true", () => {
    expect(true).toBe(true);
  });
});
