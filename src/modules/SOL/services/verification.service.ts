import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { VerificationRepository } from "../repositories/verification.repository";
import { VerificationRegisterRequestDto } from "../dtos/vertification-register-request.dto";
import { EmailService } from "src/shared/services/email.service";
import NumberUtil from "src/shared/utils/number.util";
import { UserGetResponseDto } from "../dtos/user-get-response.dto";
import { UserRepository } from "../repositories/user.repository";
import { VerificationRegisterResponseDto } from "../dtos/vertification-register-response.dto";
import { UserModel } from "../models/user.model";
import { UserResetPasswordResendEmailRequestDto } from "../dtos/user-reset-password-resend-email-request.dto";
import { UserResetPasswordResendEmailResponseDto } from "../dtos/user-reset-password-resend-email-response.dto";
import { UserConfirmationRegisterSendRequestDto } from "../dtos/user-confirmation-register-request.dto";
import { UserRegisterResendEmailRequestDto } from "../dtos/user-register-resend-email-request.dto";
import { CustomHttpException } from "src/shared/exceptions/custom-http.exception";

@Injectable()
export class VerificationService {
  private readonly logger = new Logger(VerificationService.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly verificationRepository: VerificationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async send(
    user: UserGetResponseDto,
  ): Promise<VerificationRegisterResponseDto> {
    const userModel = await this.userRepository.getById(user._id);

    let verification = await this.verificationRepository.getByUser(userModel);

    if (verification) {
      const now = new Date();
      if (now < verification.deadline) {
        throw new UnauthorizedException(
          "Um código já foi enviado e está válido!",
        );
      } else {
        await this.verificationRepository.delete(verification.id);
      }
    }

    let deadline: Date = new Date();
    deadline.setMinutes(deadline.getMinutes() + 5);

    const code = NumberUtil.generateRandomNumber();

    verification = await this.verificationRepository.save(
      new VerificationRegisterRequestDto(0, deadline, userModel, code),
    );

    await this.sendVerificationEmail(
      userModel,
      "LACCHAIN - Alteração de senha",
      `Olá ${user.name}, foi solicitado a alteração de senha!`,
      `Código: ${verification.code.toString()}`,
    );

    return new VerificationRegisterResponseDto(userModel.email);
  }

  async sendRegister(
    user: UserGetResponseDto,
  ): Promise<VerificationRegisterResponseDto> {
    const userModel = await this.userRepository.getById(user._id);

    let verification = await this.verificationRepository.getByUser(userModel);

    if (verification) {
      const now = new Date();
      if (now < verification.deadline) {
        throw new UnauthorizedException(
          "Um código já foi enviado e está válido!",
        );
      } else {
        await this.verificationRepository.delete(verification.id);
      }
    }

    let deadline: Date = new Date();
    deadline.setMinutes(deadline.getMinutes() + 5);

    const code = NumberUtil.generateRandomNumber();

    verification = await this.verificationRepository.save(
      new VerificationRegisterRequestDto(0, deadline, userModel, code),
    );

    await this.sendVerificationEmail(
      userModel,
      "LACCHAIN - Confirmação de cadastro",
      `Olá ${user.name},`,
      `seu codigo para confirmação de cadastro é: ${verification.code.toString()}`,
    );

    return new VerificationRegisterResponseDto(userModel.email);
  }

  // async sendSms(dto: UserConfirmationRegisterSendRequestDto): Promise<UserResetPasswordResendEmailResponseDto> {
  //     const userModel = await this.userRepository.getByPhone(dto.value);

  //     let verification = await this.verificationRepository.getByUser(userModel);

  //     if (verification) {
  //         const now = new Date();
  //         if (now < verification.deadline) {
  //             throw new UnauthorizedException(
  //                 'Um sms já foi enviado e está válido!',
  //             );
  //         } else {
  //             await this.verificationRepository.delete(verification._id);
  //         }
  //     }

  //     let deadline: Date = new Date();
  //     deadline.setMinutes(deadline.getMinutes() + 5);

  //     const code = NumberUtil.generateRandomNumber();

  //     verification = await this.verificationRepository.save(
  //         new VerificationRegisterRequestDto(
  //             0,
  //             deadline,
  //             userModel,
  //             code,
  //         )
  //     );

  //     let message = `LACCHAIN - Confirmação de cadastro,
  //     Ola ${userModel.name}, seu codigo para confirmação de cadastro é ${code}`

  //     await this.smsRepository.send(dto.value, message);

  //     return new UserResetPasswordResendEmailResponseDto(
  //         verification._id,
  //         userModel.email,
  //     );
  // }

  async resendResetPasswordEmail(
    dto: UserResetPasswordResendEmailRequestDto,
  ): Promise<UserResetPasswordResendEmailResponseDto> {
    const userModel = await this.userRepository.getByEmail(dto.email);

    let verification = await this.verificationRepository.getByUser(userModel);

    if (verification) {
      const now = new Date();
      if (now < verification.deadline) {
        throw new UnauthorizedException(
          "Um email já foi enviado e está válido!",
        );
      } else {
        await this.verificationRepository.delete(verification.id);
      }
    }

    let deadline: Date = new Date();
    deadline.setMinutes(deadline.getMinutes() + 5);

    const code = NumberUtil.generateRandomNumber();

    verification = await this.verificationRepository.save(
      new VerificationRegisterRequestDto(0, deadline, userModel, code),
    );

    await this.sendVerificationEmail(
      userModel,
      "INKLUSIVA - Alteração de senha",
      `Olá ${userModel.name}, foi solicitado a alteração de senha!`,
      `Código: ${verification.code.toString()}`,
    );

    return new UserResetPasswordResendEmailResponseDto(
      verification.id,
      userModel.email,
    );
  }

  async resendCodeRegisterEmail(
    dto: UserRegisterResendEmailRequestDto,
  ): Promise<UserResetPasswordResendEmailResponseDto> {
    const userModel = await this.userRepository.getByEmail(dto.email);

    let verification = await this.verificationRepository.getByUser(userModel);

    if (verification) {
      await this.verificationRepository.delete(verification.id);
    }

    let deadline: Date = new Date();
    deadline.setMinutes(deadline.getMinutes() + 5);

    const code = NumberUtil.generateRandomNumber();

    verification = await this.verificationRepository.save(
      new VerificationRegisterRequestDto(0, deadline, userModel, code),
    );

    await this.sendVerificationEmail(
      userModel,
      "LACCHAIN - Confirmação de cadastro",
      `Olá ${userModel.name},`,
      `seu codigo para confirmação de cadastro é: ${verification.code.toString()}`,
    );

    return new UserResetPasswordResendEmailResponseDto(
      verification.id,
      userModel.email,
    );
  }

  // async resendCodeRegisterSms(dto: UserRegisterResendEmailRequestDto): Promise<UserResetPasswordResendEmailResponseDto> {

  //     const userModel = await this.userRepository.getByEmail(dto.email);

  //     let verification = await this.verificationRepository.getByUser(userModel);

  //     if (verification) {
  //         await this.verificationRepository.delete(verification._id);
  //     }

  //     let deadline: Date = new Date();
  //     deadline.setMinutes(deadline.getMinutes() + 5);

  //     const code = NumberUtil.generateRandomNumber();

  //     verification = await this.verificationRepository.save(
  //         new VerificationRegisterRequestDto(
  //             0,
  //             deadline,
  //             userModel,
  //             code,
  //         )
  //     );

  //     let message = `LACCHAIN - Confirmação de cadastro,
  //     Ola ${userModel.name}, seu codigo para confirmação de cadastro é ${code}`

  //     await this.smsRepository.send(userModel.phone, message);

  //     return new UserResetPasswordResendEmailResponseDto(
  //         verification._id,
  //         userModel.email,
  //     );
  // }

  async verifyCode(user: UserModel, code: number): Promise<void> {
    const verification = await this.verificationRepository.getByUser(user);

    if (!verification)
      throw new CustomHttpException(
        "Código não encontrado!",
        HttpStatus.NOT_FOUND,
      );

    const now = new Date();
    if (now > verification.deadline) {
      await this.verificationRepository.delete(verification.id);
      throw new CustomHttpException(
        "Código expirado!",
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (verification.attempt == 5) {
      await this.verificationRepository.delete(verification.id);
      throw new CustomHttpException(
        "Você excedeu o limite de 5 tentativas!",
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (verification.code != code) {
      this.incrementAttempt(verification._id);
      throw new CustomHttpException(
        "Código inválido!",
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.verificationRepository.delete(verification.id);
  }

  async sendFirstAcess(
    user: UserGetResponseDto,
  ): Promise<VerificationRegisterResponseDto> {
    const userModel = await this.userRepository.getById(user._id);

    let verification = await this.verificationRepository.getByUser(userModel);

    const alreadyHasValidVerification =
      verification && new Date() < verification.deadline;
    if (alreadyHasValidVerification) {
      throw new CustomHttpException(
        "Um código já foi enviado e está válido!",
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (verification) {
      await this.verificationRepository.delete(verification.id);
    }

    let deadline: Date = new Date();
    deadline.setMinutes(deadline.getMinutes() + 5);

    const code = NumberUtil.generateRandomNumber();

    verification = await this.verificationRepository.save(
      new VerificationRegisterRequestDto(0, deadline, userModel, code),
    );

    const systemName = "SOL";
    const plainText = `Hello ${user.name},\n\nVoce esta recebendo este e-mail para realizar o primeiro acesso ao sistema SOL.\n\nSeu codigo de verificacao (PIN): ${code}\n\nSe voce nao solicitou este acesso, ignore este e-mail.\n\nAtenciosamente,\nEquipe ${systemName}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 24px;">
        <table width="100%" style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #00000011;">
          <tr>
            <td style="padding: 32px 24px 24px 24px; text-align: center;">
              <h2 style="color: #1a237e; margin-bottom: 12px;">Ola, ${user.name}!</h2>
              <p style="font-size: 15px; color: #333; margin-bottom: 24px;">Voce esta recebendo este e-mail para realizar o primeiro acesso ao sistema <b>SOL</b>.</p>
              <div style="margin: 24px 0;">
                <span style="display:inline-block;font-size:22px;font-weight:bold;color:#1976d2;letter-spacing:2px;padding:12px 24px;border:2px dashed #1976d2;border-radius:6px;background:#f5faff;">
                  ${code}
                </span>
              </div>
              <p style="font-size: 14px; color: #444; margin-top: 24px;">Se nao solicitou este acesso, ignore este e-mail.</p>
              <p style="font-size: 13px; color: #888; margin-top: 32px;">Atenciosamente,<br>Equipe SOL</p>
            </td>
          </tr>
        </table>
    </div>
    `;

    await this.sendVerificationEmail(
      userModel,
      `${systemName} - Primeiro Acesso`,
      plainText,
      htmlContent,
    );

    return new VerificationRegisterResponseDto(userModel.email);
  }

  private async incrementAttempt(_id: any) {
    const verification = await this.verificationRepository.getById(_id);
    const attempt = verification.attempt + 1;
    await this.verificationRepository.incrementAttempt(_id, attempt);
  }

  private async sendVerificationEmail(
    user: UserModel,
    title: string,
    text: string,
    html: string,
  ) {
    const verification = await this.verificationRepository.getByUser(user);

    await this.emailService.sendEmail(
      verification.user.email,
      title,
      text,
      html,
    );

    return verification;
  }
}
