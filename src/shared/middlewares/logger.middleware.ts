import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get("user-agent") || "-";
    const contentLength = req.get("content-length") || "0";
    const startTime = Date.now();

    this.logger.log(
      `→ ${method} ${originalUrl} [${ip}] [${userAgent}] [${contentLength}B]`,
    );

    const originalSend = res.send;
    res.send = (body: any): Response => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      const resContentLength = res.get("content-length") || "0";

      const logMessage = `← ${method} ${originalUrl} ${statusCode} ${duration}ms [${resContentLength}B]`;

      if (statusCode >= 500) {
        this.logger.error(logMessage);
      } else if (statusCode >= 400) {
        this.logger.warn(logMessage);
      } else {
        this.logger.log(logMessage);
      }

      res.send = originalSend;
      return res.send(body);
    };

    next();
  }
}
