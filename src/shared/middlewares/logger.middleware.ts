import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");

  private readonly MAX_BODY_LENGTH = 2048;

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get("user-agent") || "-";
    const contentLength = req.get("content-length") || "0";
    const startTime = Date.now();

    const requestBody = this.serializeBody(req.body);

    this.logger.log(
      `→ ${method} ${originalUrl} [${ip}] [${userAgent}] [${contentLength}B]`,
    );

    if (requestBody) {
      this.logger.debug(`  ↳ Request Body: ${requestBody}`);
    }

    const originalSend = res.send;
    res.send = (body: any): Response => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      const resContentLength = res.get("content-length") || "0";
      const responseBody = this.serializeBody(body);

      const logMessage = `← ${method} ${originalUrl} ${statusCode} ${duration}ms [${resContentLength}B]`;

      if (statusCode >= 500) {
        this.logger.error(logMessage);
        if (responseBody)
          this.logger.error(`  ↳ Response Body: ${responseBody}`);
      } else if (statusCode >= 400) {
        this.logger.warn(logMessage);
        if (responseBody)
          this.logger.warn(`  ↳ Response Body: ${responseBody}`);
      } else {
        this.logger.log(logMessage);
        if (responseBody)
          this.logger.debug(`  ↳ Response Body: ${responseBody}`);
      }

      res.send = originalSend;
      return res.send(body);
    };

    next();
  }

  private serializeBody(body: any): string | null {
    if (!body) return null;

    try {
      const serialized = typeof body === "string" ? body : JSON.stringify(body);

      if (!serialized || serialized === "{}" || serialized === "{}")
        return null;

      return serialized.length > this.MAX_BODY_LENGTH
        ? `${serialized.substring(0, this.MAX_BODY_LENGTH)}... [TRUNCATED]`
        : serialized;
    } catch {
      return "[UNSERIALIZABLE]";
    }
  }
}
