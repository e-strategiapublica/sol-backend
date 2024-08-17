import { ConfigService } from "@nestjs/config";
import { SendGridService } from "@ntegral/nestjs-sendgrid";
export declare class EmailService {
    private readonly client;
    private readonly configService;
    constructor(client: SendGridService, configService: ConfigService);
    sendEmail(to: string, subject: string, text: string, html: string): Promise<void>;
}
