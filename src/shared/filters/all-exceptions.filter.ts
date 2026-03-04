import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger("ExceptionFilter");

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = isHttpException
      ? exception.getResponse()
      : { statusCode: status, message: "Internal server error" };

    const message =
      typeof errorResponse === "string"
        ? errorResponse
        : (errorResponse as any)?.message || "Internal server error";

    if (status >= 500) {
      this.logger.error(
        `[${request.method}] ${request.originalUrl} → ${status} | ${JSON.stringify(message)}`,
      );

      if (exception instanceof Error) {
        this.logger.error(exception.stack);
      } else {
        this.logger.error(JSON.stringify(exception));
      }
    } else if (status >= 400) {
      this.logger.warn(
        `[${request.method}] ${request.originalUrl} → ${status} | ${JSON.stringify(message)}`,
      );
    }

    response
      .status(status)
      .json(
        typeof errorResponse === "object"
          ? errorResponse
          : { statusCode: status, message: errorResponse },
      );
  }
}
