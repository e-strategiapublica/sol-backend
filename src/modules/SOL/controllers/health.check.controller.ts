import { Controller, Get, HttpCode, HttpStatus, Logger } from "@nestjs/common";

@Controller("health-check")
export class HealthCheckController {
  private readonly _logger = new Logger(HealthCheckController.name);

  constructor() {}

  @Get()
  @HttpCode(200)
  async list() {
    this._logger.log("Health check called with log");
    return { message: "OK" };
  }
}
