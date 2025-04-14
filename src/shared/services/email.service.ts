import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectSendGrid, SendGridService } from "@ntegral/nestjs-sendgrid";
import { EnviromentVariablesEnum } from "../enums/enviroment.variables.enum";
import { CustomHttpException } from "../exceptions/custom-http.exception";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(
    @InjectSendGrid() private readonly client: SendGridService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(to: string, subject: string, text: string, html: string) {
    try {
      const msg = {
        to,
        from: this.configService.get(
          EnviromentVariablesEnum.SENDGRID_EMAIL_SENDER,
        ),
        subject,
        text,
        html,
      };

      await this.client.send(msg);
    } catch (error) {
      this.logger.error("Error sending email", error);
      throw new CustomHttpException(
        "Erro ao enviar email, tente novamente mais tarde!",
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
