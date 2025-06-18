import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import { EnviromentVariablesEnum } from "../../../shared/enums/enviroment.variables.enum";
@Injectable()
export class FileRepository {
  private bucketPath: string;
  private readonly _logger = new Logger(FileRepository.name);
  private sanitizeFilename(filename: string): string {
    // Remove caracteres suspeitos e impede "../" e similares
    const base = path.basename(filename); // já elimina ../
    return base.replace(/[^a-zA-Z0-9._-]/g, "_");
  }

  private resolveAndValidatePath(filename: string): string {
    const bucketRaw = this._configService.get<string>(EnviromentVariablesEnum.BUCKET);
    const bucket = path.resolve(bucketRaw);
    const sanitized = this.sanitizeFilename(filename);
    const fullPath = path.resolve(bucket, sanitized);

    // Verificação de segurança contra path traversal
    if (!fullPath.startsWith(bucket + path.sep)) {
      throw new Error(`Invalid file path detected: ${fullPath}`);
    }
    return fullPath;
  }

  upload(filename: string, base64: string): string {
    const fullPath = this.resolveAndValidatePath(filename);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const base64Data = base64.replace(/^data:([A-Za-z-+/]+);base64,/, "");
    fs.writeFileSync(fullPath, base64Data, { encoding: "base64" });

    return fullPath;
  }

  async download(filename: string): Promise<Buffer> {
    const fullPath = this.resolveAndValidatePath(filename);
    return fs.promises.readFile(fullPath);
  }
}
