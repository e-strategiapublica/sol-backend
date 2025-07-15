import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";
import { UserModel } from "../models/user.model";
import { UserTypeEnum } from "../enums/user-type.enum";
import * as bcrypt from "bcryptjs";
import { ConfigService } from "@nestjs/config";
import { EnviromentVariablesEnum as Env } from "src/shared/enums/enviroment.variables.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";

@Injectable()
export class UserSeeder implements OnModuleInit {
  private readonly logger = new Logger(UserSeeder.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserModel>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    const adminExists = await this.userModel.findOne({
      type: UserTypeEnum.administrador,
    });

    if (adminExists) return;

    const passwordSalt = Number(
      this.configService.get<number>(Env.PASSWORD_SALT),
    );

    const adminEmail = this.configService.get<string>(Env.ADMIN_DEFAULT_EMAIL);
    const adminPassword = this.configService.get<string>(
      Env.ADMIN_DEFAULT_PASSWORD,
    );
    const hashedPassword = await bcrypt.hash(adminPassword, passwordSalt);

    await this.userModel.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      type: UserTypeEnum.administrador,
      status: UserStatusEnum.active,
      roles: UserRolesEnum.geral,
    });
    this.logger.log("Usuário admin padrão criado.");
  }
}
