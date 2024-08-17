/// <reference types="node" />
import { ConfigService } from "@nestjs/config";
export declare class FileRepository {
    private readonly _configService;
    constructor(_configService: ConfigService);
    upload(filename: string, base64: string): string;
    download(filename: string): Promise<Buffer>;
}
