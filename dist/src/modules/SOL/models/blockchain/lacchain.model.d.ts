import { ConfigService } from '@nestjs/config';
import { HttpService } from "@nestjs/axios";
export declare class LacchainModel {
    readonly configService: ConfigService;
    private httpService;
    constructor(configService: ConfigService, httpService: HttpService);
    getBidData(_bidHistoryId: string): Promise<any>;
    setBidData(token: any, bidHistoryId: any, hash: any): Promise<any>;
}
