import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { SolModule } from './modules/SOL/sol.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env`
    }),
    ScheduleModule.forRoot(),
    SolModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
