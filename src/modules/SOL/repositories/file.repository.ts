import { Injectable, Logger, Scope, StreamableFile } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import { EnviromentVariablesEnum } from "../../../shared/enums/enviroment.variables.enum";
import * as path from "path";

@Injectable()
export class FileRepository {
  private readonly logger = new Logger(FileRepository.name);
  constructor(private readonly _configService: ConfigService) {}

  upload(filename: string, base64: string): string {
    const bucket = this._configService.get<string>(
      EnviromentVariablesEnum.BUCKET,
    );

    const fullPath = path.join(bucket, filename);
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

  createDirectoryIfNotExists(directory: string): void {
    const fullPath = path.join(directory);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  writeFile(
    directory: string,
    filename: string,
    content: string | Buffer,
  ): void {
    const fullPath = path.join(directory, filename);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, content);
  }

  readFile(
    directory: string,
    filename: string,
    encoding: BufferEncoding,
  ): string {
    try {
      const fullPath = path.join(directory, filename);
      return fs.readFileSync(fullPath, encoding);
    } catch (error) {
      this.logger.warn(`file not found, ${directory}/${filename}`);
      return undefined;
    }
  }
}
