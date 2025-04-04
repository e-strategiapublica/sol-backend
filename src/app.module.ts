import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { SolModule } from "./modules/SOL/sol.module";
import AppEnviroments from "./shared/config/app.enviroments";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env`,
      load: [AppEnviroments],
    }),
    ScheduleModule.forRoot(),
    SolModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
