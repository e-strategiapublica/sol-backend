import {
  HttpStatus,
  Injectable,
  Logger,
  Scope,
  StreamableFile,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import { EnviromentVariablesEnum } from "../../../shared/enums/enviroment.variables.enum";
import * as path from "path";
import sanitizeFilename from "sanitize-filename";
import { CustomHttpException } from "src/shared/exceptions/custom-http.exception";
@Injectable()
export class FileRepository {
  private bucketPath: string;
  private readonly _logger = new Logger(FileRepository.name);

  constructor(private readonly _configService: ConfigService) {
    const bucket = this._configService.get<string>(
      EnviromentVariablesEnum.BUCKET,
    );
    this.bucketPath = path.resolve(bucket);
  }

  private getFilePath(filename: string): string {
    const sanitizedFilename = sanitizeFilename(filename);
    const fullPath = path.resolve(this.bucketPath, sanitizedFilename);
    if (!fullPath.startsWith(this.bucketPath)) {
      this._logger.error({ full_path: fullPath }, "invalid file path");
      throw new CustomHttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return fullPath;
  }

  upload(filename: string, base64: string): string {
    const fullPath = this.getFilePath(filename);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const base64Data = base64.replace(/^data:([A-Za-z-+/]+);base64,/, "");

    fs.writeFileSync(fullPath, base64Data, { encoding: "base64" });

    return fullPath;
  }

  async download(filename: string): Promise<Buffer> {
    const pdf = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(filename, {}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return pdf;
  }
}
