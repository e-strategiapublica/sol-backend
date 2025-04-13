import { faker } from "@faker-js/faker/.";
import { INestApplication } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserRolesEnum } from "src/modules/SOL/enums/user-roles.enum";
import { UserStatusEnum } from "src/modules/SOL/enums/user-status.enum";
import { User } from "src/modules/SOL/schemas/user.schema";
import { hashPassword } from "src/shared/utils/string.util";
import { login } from "./common.request";
import { AuthenticateResponseDto } from "src/modules/SOL/dtos/authenticate-responsedto";
import { UserTypeEnum } from "src/modules/SOL/enums/user-type.enum";
import { UserDocument, UserModel } from "src/modules/SOL/models/user.model";
import CryptoUtil from "src/shared/utils/crypto.util";

export const createUser = async (
  app: INestApplication,
  role: UserRolesEnum,
  type: UserTypeEnum,
): Promise<{ user: User; password: string }> => {
  const userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
  const password = faker.internet.password();
  const user = await userModel.create({
    email: faker.internet.email(),
    password: await hashPassword(password),
    roles: role,
    status: UserStatusEnum.active,
    type,
    name: faker.person.fullName(),
  });

  return { user, password };
};

export const simulateLogin = async (
  app: INestApplication,
  role: UserRolesEnum,
  type: UserTypeEnum,
): Promise<AuthenticateResponseDto> => {
  const { user, password } = await createUser(app, role, type);

  const data = JSON.stringify({
    email: user.email,
    password,
  });
  const payloadKey = process.env.ENCRYPT_KEY;
  const payload = CryptoUtil.encrypt(payloadKey, data);

  const response = (
    await login(app, {
      payload,
    })
  ).body.data as AuthenticateResponseDto;

  return response;
};
