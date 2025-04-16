import { Injectable, Scope, StreamableFile } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import { EnviromentVariablesEnum } from "../../../shared/enums/enviroment.variables.enum";
import * as path from "path";

@Injectable()
export class FileRepository {
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
}
