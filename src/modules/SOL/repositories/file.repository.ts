import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import { EnviromentVariablesEnum } from "../../../shared/enums/enviroment.variables.enum";

@Injectable()
export class FileRepository {
  constructor(private readonly _configService: ConfigService) {}

  private sanitizeFilename(filename: string): string {
    // Remove caminhos absolutos, ../, ..\, etc.
    const base = path.basename(filename);
    return base.replace(/[^a-zA-Z0-9._-]/g, "_"); // Permite apenas caracteres seguros
  }

  upload(filename: string, base64: string): string {
    const bucket = this._configService.get<string>(EnviromentVariablesEnum.BUCKET);
    const sanitizedFilename = this.sanitizeFilename(filename);
    const fullPath = path.resolve(bucket, sanitizedFilename);
    const resolvedBucket = path.resolve(bucket);

    if (!fullPath.startsWith(resolvedBucket)) {
      throw new Error("Invalid file path");
    }

    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const base64Data = base64.replace(/^data:([A-Za-z-+/]+);base64,/, "");
    fs.writeFileSync(fullPath, base64Data, { encoding: "base64" });

    return fullPath;
  }

  async download(filename: string): Promise<Buffer> {
    const bucket = this._configService.get<string>(EnviromentVariablesEnum.BUCKET);
    const sanitizedFilename = this.sanitizeFilename(filename);
    const fullPath = path.resolve(bucket, sanitizedFilename);
    const resolvedBucket = path.resolve(bucket);

    if (!fullPath.startsWith(resolvedBucket)) {
      throw new Error("Invalid file path");
    }

    return await fs.promises.readFile(fullPath);
  }
}
